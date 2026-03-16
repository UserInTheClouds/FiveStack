import prisma from '../utilities/dbConnect.js'

export const sendMessage = async (req,res)=>{
    try {
        const {text} = req.body;
        if(!text){
            return res.status(500).json('Message cannot be empty');
        }
        const receiverId = Number(req.params.id);
        const senderId = req.user.id;
        let groupChat;
        
        const receiver = await prisma.group.findUnique({
            where:{
                id:receiverId
            }
        });
        if(receiver.isGroup){
            groupChat = await prisma.group.findFirst({
                where:{isGroup:true,
                AND:[
                    {participants:{some:{id:senderId}}},
                    {participants:{some:{id:receiverId}}}
                ]}
            });
        }
        if(!receiver.isGroup){
            groupChat = await prisma.group.findFirst({
                where:{isGroup:false,
                AND:[
                    {participants:{some:{id:senderId}}},
                    {participants:{some:{id:receiverId}}}
                ]}
            });
        }
        
        if(!groupChat){
            groupChat = await prisma.group.create({
                data:{
                    participants:{
                        connect:[
                            {id:senderId},
                            {id:receiverId}
                        ]
                    }
                }
            })
        }

        const newMessage = await prisma.message.create({
            data:{
                content:text,
                senderId:senderId,
                groupId:groupChat.id
            }
        })

        return res.status(201).json({newMessage});

    } catch (error) {
        console.log("Error in sendMessage controller",error);
        return res.status(400).json({message:error.message});        
    }
}

export const receiveMessage = async (req,res)=>{
    try {
        const senderId = req.user.id;
        const receiverId = Number(req.params.id);
        let groupChat;

        const receiver = await prisma.group.findFirst({
            where:{
                id:receiverId
            }
        })

        if(receiver.isGroup){
            groupChat = await prisma.group.findFirst({
                where:{
                    isGroup:true,
                    AND:[
                        {participants:{some:{id:senderId}}},
                        {participants:{some:{id:receiverId}}}
                    ]
                }
            })
        }

        if(!receiver.isGroup){
            groupChat = await prisma.group.findFirst({
                where:{
                    isGroup:false,
                    AND:[
                        {participants:{some:{id:senderId}}},
                        {participants:{some:{id:receiverId}}}
                    ]
                },
                include:{
                    messages:{
                        orderBy:{
                            createdAt:'asc'
                        }
                    }
                }
            })
        }

        if(!groupChat){
            return res.status(500).json({message:"This chat does not exist"});
        }

        return res.status(200).json(groupChat.messages);

    } catch (error) {
        console.log('Error in receiveMessage controller',error);
        return res.status(400).json({message:error.message});
    }
}