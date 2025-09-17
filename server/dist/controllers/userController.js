"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = async (req, res) => {
    try {
        const user = await prisma.users.findMany();
        res.json(user);
    }
    catch (error) {
        console.error("Error fetching metrics:", error);
        res.status(500).json({ error: "Error retrieving users" });
    }
};
exports.getUsers = getUsers;
//# sourceMappingURL=userController.js.map