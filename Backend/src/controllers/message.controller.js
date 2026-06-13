import prisma from '../utilities/dbConnect.js'

export const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const imageUrl = req.file ? req.file.path : null;
        if (!text && !imageUrl) {
            return res.status(400).json('Message cannot be empty');
        }
        const receiverId = Number(req.params.id);
        const senderId = req.user.id;
        let groupChat = await prisma.group.findFirst({
            where: {
                isGroup: false,
                AND: [
                    { participants: { some: { id: senderId } } },
                    { participants: { some: { id: receiverId } } }
                ]
            }
        });


        if (!groupChat) {
            groupChat = await prisma.group.create({
                data: {
                    isGroup: false,
                    participants: {
                        connect: [
                            { id: senderId },
                            { id: receiverId }
                        ]
                    }
                }
            })
        }

        const newMessage = await prisma.message.create({
            data: {
                content: text || null,
                image: imageUrl,
                senderId: senderId,
                groupId: groupChat.id
            }
        })

        const io = req.app.get("io");
        const userSocketMap = req.app.get('userSocketMap');
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }

        return res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const receiveMessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const receiverId = Number(req.params.id);
        let groupChat = await prisma.group.findFirst({
            where: {
                isGroup: false,
                AND: [
                    { participants: { some: { id: senderId } } },
                    { participants: { some: { id: receiverId } } }
                ]
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                },
            }
        })

        if (!groupChat) {
            return res.status(200).json([]);
        }

        return res.status(200).json(groupChat.messages);

    } catch (error) {
        console.log('Error in receiveMessage controller', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getUsersRoute = async (req, res) => {
    try {
        const userId = req.user.id;
        const chatGroup = await prisma.user.findMany({
            where: {
                id: { not: userId },
                groups: {
                    some: {
                        isGroup: false,
                        participants: {
                            some: { id: userId }
                        }
                    }
                }

            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });

        return res.status(200).json(chatGroup);

    } catch (error) {
        console.log("Error in getUsersRoute controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const searchUsername = async (req, res) => {
    try {
        const senderId = req.user.id;
        const text = req.query.text;
        const foundUser = await prisma.user.findMany({
            where: {
                id: { not: senderId },
                username: {
                    contains: text,
                    mode: "insensitive"
                }
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        })
        if (!foundUser) {
            return res.status(200).json([]);
        }

        return res.status(200).json(foundUser);

    }
    catch (error) {
        console.log("Error in searchUsername controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}