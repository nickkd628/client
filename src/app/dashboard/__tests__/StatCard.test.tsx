import { render, screen } from '@testing-library/react';
import StatCard from '../StatCard';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

describe('StatCard Component', () => {
  /**
   * Test: Should render StatCard with all provided props
   * Verifies that all props are displayed correctly
   */
  it('should render StatCard with all provided props', () => {
    const props = {
      title: 'Total Revenue',
      amount: '$45,231.89',
      changePercent: 12.5,
      IconComponent: DollarSign,
      dateRange: 'Last 30 days',
    };

    render(<StatCard {...props} />);

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$45,231.89')).toBeInTheDocument();
    expect(screen.getByText('12.5%')).toBeInTheDocument();
    expect(screen.getByText('Last 30 days')).toBeInTheDocument();
  });

  /**
   * Test: Should display positive change percentage with green color
   * Verifies styling for positive trends
   */
  it('should display positive change percentage with green color', () => {
    const props = {
      title: 'Sales',
      amount: '$1,234',
      changePercent: 8.3,
      IconComponent: TrendingUp,
      dateRange: 'This week',
    };

    render(<StatCard {...props} />);

    const changeElement = screen.getByText('8.3%');
    expect(changeElement).toHaveClass('text-green-500');
  });

  /**
   * Test: Should display negative change percentage with red color
   * Verifies styling for negative trends
   */
  it('should display negative change percentage with red color', () => {
    const props = {
      title: 'Expenses',
      amount: '$2,567',
      changePercent: -5.2,
      IconComponent: TrendingDown,
      dateRange: 'This month',
    };

    render(<StatCard {...props} />);

    const changeElement = screen.getByText('-5.2%');
    expect(changeElement).toHaveClass('text-red-500');
  });

  /**
   * Test: Should display zero change percentage with gray color
   * Verifies styling for neutral trends
   */
  it('should display zero change percentage with gray color', () => {
    const props = {
      title: 'Orders',
      amount: '156',
      changePercent: 0,
      IconComponent: DollarSign,
      dateRange: 'Today',
    };

    render(<StatCard {...props} />);

    const changeElement = screen.getByText('0%');
    expect(changeElement).toHaveClass('text-gray-500');
  });

  /**
   * Test: Should render without changePercent when not provided
   * Verifies optional prop handling
   */
  it('should render without changePercent when not provided', () => {
    const props = {
      title: 'Users',
      amount: '1,247',
      IconComponent: DollarSign,
      dateRange: 'All time',
    };

    render(<StatCard {...props} />);

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('1,247')).toBeInTheDocument();
    expect(screen.getByText('All time')).toBeInTheDocument();
    
    // Should not display any percentage
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  /**
   * Test: Should render icon component when provided
   * Verifies that the icon is displayed correctly
   */
  it('should render icon component when provided', () => {
    const props = {
      title: 'Revenue',
      amount: '$5,000',
      changePercent: 15,
      IconComponent: DollarSign,
      dateRange: 'This quarter',
    };

    const { container } = render(<StatCard {...props} />);
    
    // Check if the icon is rendered (DollarSign component)
    const iconElement = container.querySelector('[data-lucide="dollar-sign"]');
    expect(iconElement).toBeInTheDocument();
  });

  /**
   * Test: Should handle long text gracefully
   * Verifies that long titles and amounts don't break the layout
   */
  it('should handle long text gracefully', () => {
    const props = {
      title: 'Very Long Title That Might Wrap To Multiple Lines',
      amount: '$123,456,789.99',
      changePercent: 999.99,
      IconComponent: DollarSign,
      dateRange: 'From January 1st to December 31st of this year',
    };

    render(<StatCard {...props} />);

    expect(screen.getByText('Very Long Title That Might Wrap To Multiple Lines')).toBeInTheDocument();
    expect(screen.getByText('$123,456,789.99')).toBeInTheDocument();
    expect(screen.getByText('999.99%')).toBeInTheDocument();
    expect(screen.getByText('From January 1st to December 31st of this year')).toBeInTheDocument();
  });
});