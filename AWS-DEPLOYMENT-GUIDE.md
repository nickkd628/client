# AWS Production Deployment Guide
## Inventory Management System

### Prerequisites

- AWS CLI configured with appropriate permissions
- Docker installed locally
- Terraform (optional, for Infrastructure as Code)
- Domain name configured in AWS Route 53

---

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CloudFront    │───▶│  Application     │───▶│   RDS           │
│   (CDN)         │    │  Load Balancer   │    │   PostgreSQL    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                               │
                       ┌───────▼───────┐
                       │  ECS Fargate  │
                       │  Containers   │
                       └───────────────┘
```

---

## Step-by-Step Deployment

### Phase 1: AWS Infrastructure Setup

#### 1.1 Create VPC and Networking

```bash
# Create VPC
aws ec2 create-vpc \
  --cidr-block 10.0.0.0/16 \
  --enable-dns-hostnames \
  --enable-dns-support \
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=inventory-vpc}]'

# Create Internet Gateway
aws ec2 create-internet-gateway \
  --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=inventory-igw}]'

# Create Subnets (Public and Private)
# Public Subnet 1 (us-east-1a)
aws ec2 create-subnet \
  --vpc-id vpc-xxxxxxxxx \
  --cidr-block 10.0.1.0/24 \
  --availability-zone us-east-1a \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=inventory-public-1}]'

# Public Subnet 2 (us-east-1b)
aws ec2 create-subnet \
  --vpc-id vpc-xxxxxxxxx \
  --cidr-block 10.0.2.0/24 \
  --availability-zone us-east-1b \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=inventory-public-2}]'

# Private Subnet 1 (us-east-1a)
aws ec2 create-subnet \
  --vpc-id vpc-xxxxxxxxx \
  --cidr-block 10.0.10.0/24 \
  --availability-zone us-east-1a \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=inventory-private-1}]'

# Private Subnet 2 (us-east-1b)
aws ec2 create-subnet \
  --vpc-id vpc-xxxxxxxxx \
  --cidr-block 10.0.11.0/24 \
  --availability-zone us-east-1b \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=inventory-private-2}]'
```

#### 1.2 Create Security Groups

```bash
# ALB Security Group
aws ec2 create-security-group \
  --group-name inventory-alb-sg \
  --description "Security group for Application Load Balancer" \
  --vpc-id vpc-xxxxxxxxx

# ECS Security Group
aws ec2 create-security-group \
  --group-name inventory-ecs-sg \
  --description "Security group for ECS containers" \
  --vpc-id vpc-xxxxxxxxx

# RDS Security Group
aws ec2 create-security-group \
  --group-name inventory-rds-sg \
  --description "Security group for RDS database" \
  --vpc-id vpc-xxxxxxxxx
```

### Phase 2: Database Setup (RDS)

#### 2.1 Create RDS Subnet Group

```bash
aws rds create-db-subnet-group \
  --db-subnet-group-name inventory-db-subnet-group \
  --db-subnet-group-description "Subnet group for inventory database" \
  --subnet-ids subnet-xxxxxxxxx subnet-yyyyyyyyy
```

#### 2.2 Create RDS PostgreSQL Instance

```bash
aws rds create-db-instance \
  --db-instance-identifier inventory-production-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 15.4 \
  --master-username inventoryuser \
  --master-user-password 'YourSecurePassword123!' \
  --allocated-storage 20 \
  --storage-type gp2 \
  --vpc-security-group-ids sg-xxxxxxxxx \
  --db-subnet-group-name inventory-db-subnet-group \
  --backup-retention-period 7 \
  --multi-az \
  --storage-encrypted \
  --deletion-protection
```

### Phase 3: Container Registry (ECR)

#### 3.1 Create ECR Repositories

```bash
# Create repository for backend
aws ecr create-repository \
  --repository-name inventory-backend \
  --region us-east-1

# Create repository for frontend
aws ecr create-repository \
  --repository-name inventory-frontend \
  --region us-east-1

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
```

#### 3.2 Build and Push Docker Images

```bash
# Build and push backend image
cd server
docker build -t inventory-backend .
docker tag inventory-backend:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/inventory-backend:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/inventory-backend:latest

# Build and push frontend image
cd ..
docker build -t inventory-frontend .
docker tag inventory-frontend:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/inventory-frontend:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/inventory-frontend:latest
```

### Phase 4: ECS Cluster Setup

#### 4.1 Create ECS Cluster

```bash
aws ecs create-cluster \
  --cluster-name inventory-production \
  --capacity-providers FARGATE \
  --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1
```

#### 4.2 Create Task Definitions

**Backend Task Definition** (`backend-task-definition.json`):
```json
{
  "family": "inventory-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "inventory-backend",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/inventory-backend:latest",
      "portMappings": [
        {
          "containerPort": 8000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "PORT",
          "value": "8000"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:inventory/database-url"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/inventory-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": [
          "CMD-SHELL",
          "curl -f http://localhost:8000/health || exit 1"
        ],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
```

#### 4.3 Register Task Definitions

```bash
aws ecs register-task-definition \
  --cli-input-json file://backend-task-definition.json

aws ecs register-task-definition \
  --cli-input-json file://frontend-task-definition.json
```

### Phase 5: Load Balancer Setup

#### 5.1 Create Application Load Balancer

```bash
aws elbv2 create-load-balancer \
  --name inventory-alb \
  --subnets subnet-xxxxxxxxx subnet-yyyyyyyyy \
  --security-groups sg-xxxxxxxxx \
  --scheme internet-facing \
  --type application \
  --ip-address-type ipv4
```

#### 5.2 Create Target Groups

```bash
# Backend target group
aws elbv2 create-target-group \
  --name inventory-backend-tg \
  --protocol HTTP \
  --port 8000 \
  --vpc-id vpc-xxxxxxxxx \
  --target-type ip \
  --health-check-protocol HTTP \
  --health-check-path /health

# Frontend target group
aws elbv2 create-target-group \
  --name inventory-frontend-tg \
  --protocol HTTP \
  --port 3000 \
  --vpc-id vpc-xxxxxxxxx \
  --target-type ip \
  --health-check-protocol HTTP \
  --health-check-path /
```

### Phase 6: ECS Services

#### 6.1 Create ECS Services

```bash
# Backend service
aws ecs create-service \
  --cluster inventory-production \
  --service-name inventory-backend-service \
  --task-definition inventory-backend:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxxxxxx,subnet-yyyyyyyyy],securityGroups=[sg-xxxxxxxxx],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/inventory-backend-tg/xxxxxxxxx,containerName=inventory-backend,containerPort=8000"

# Frontend service
aws ecs create-service \
  --cluster inventory-production \
  --service-name inventory-frontend-service \
  --task-definition inventory-frontend:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxxxxxx,subnet-yyyyyyyyy],securityGroups=[sg-xxxxxxxxx],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/inventory-frontend-tg/xxxxxxxxx,containerName=inventory-frontend,containerPort=3000"
```

### Phase 7: CloudFront and SSL

#### 7.1 Request SSL Certificate

```bash
aws acm request-certificate \
  --domain-name yourdomain.com \
  --subject-alternative-names www.yourdomain.com \
  --validation-method DNS \
  --region us-east-1
```

#### 7.2 Create CloudFront Distribution

```bash
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

### Phase 8: Monitoring and Logging

#### 8.1 Create CloudWatch Log Groups

```bash
aws logs create-log-group \
  --log-group-name /ecs/inventory-backend

aws logs create-log-group \
  --log-group-name /ecs/inventory-frontend
```

#### 8.2 Set up CloudWatch Alarms

```bash
# High CPU alarm
aws cloudwatch put-metric-alarm \
  --alarm-name "inventory-high-cpu" \
  --alarm-description "High CPU utilization" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2
```

---

## Post-Deployment Configuration

### Database Migration

```bash
# Run database migrations
aws ecs run-task \
  --cluster inventory-production \
  --task-definition inventory-backend:1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxxxxxx],securityGroups=[sg-xxxxxxxxx],assignPublicIp=ENABLED}" \
  --overrides '{
    "containerOverrides": [{
      "name": "inventory-backend",
      "command": ["npm", "run", "prisma:migrate"]
    }]
  }'
```

### Environment Variables

Store sensitive configuration in AWS Secrets Manager:

```bash
aws secretsmanager create-secret \
  --name inventory/database-url \
  --description "Database connection string" \
  --secret-string "postgresql://username:password@endpoint:5432/database"

aws secretsmanager create-secret \
  --name inventory/jwt-secret \
  --description "JWT signing secret" \
  --generate-random-password
```

---

## Maintenance and Operations

### Backup Strategy

- **RDS Automated Backups**: 7-day retention
- **Point-in-time Recovery**: Enabled
- **Manual Snapshots**: Weekly

### Monitoring

- **CloudWatch Metrics**: CPU, Memory, Network
- **Application Logs**: Centralized in CloudWatch
- **Alarms**: CPU > 80%, Memory > 80%, Error Rate > 5%

### Scaling Configuration

```bash
# Auto Scaling Target
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --resource-id service/inventory-production/inventory-backend-service \
  --scalable-dimension ecs:service:DesiredCount \
  --min-capacity 2 \
  --max-capacity 10
```

---

## Cost Optimization

### Estimated Monthly Costs

- **ECS Fargate**: ~$50-100 (depending on usage)
- **RDS db.t3.micro**: ~$13
- **ALB**: ~$22
- **CloudFront**: ~$1-10 (depending on traffic)
- **Data Transfer**: Variable

**Total Estimated**: $86-145/month

### Cost Reduction Strategies

1. Use Spot instances for development environments
2. Implement auto-scaling to reduce over-provisioning
3. Use CloudFront caching to reduce backend load
4. Implement application-level caching with ElastiCache

---

## Troubleshooting

### Common Issues

1. **Service Won't Start**: Check CloudWatch logs
2. **Database Connection Failed**: Verify security groups
3. **Load Balancer Health Checks Failing**: Check health endpoint
4. **High Latency**: Enable CloudFront caching

### Useful Commands

```bash
# Check service status
aws ecs describe-services --cluster inventory-production --services inventory-backend-service

# View logs
aws logs tail /ecs/inventory-backend --follow

# Scale service
aws ecs update-service --cluster inventory-production --service inventory-backend-service --desired-count 4
```

---

*This guide provides a comprehensive production deployment to AWS. Adjust configurations based on your specific requirements and security policies.*