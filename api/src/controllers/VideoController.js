const Video = require("../models/video");
const { v4: uuid } = require("uuid");

module.exports = {
    async index(request, response) {
        try {
            const videos = await Video.find();
            return response.status(200).json({ videos });
        } catch (err) {
            return response.status(500).json({ error: err.message });
        }
    }, 

    async store(request, response) {
        const { title, link } = request.body;
        
        if (!title || !link) { 
            return response.status(400).json({ error: "Missing title or link" });
        }

        const video = new Video({
            id: uuid(),
            title,
            link,
            liked: false,
        });

        try {
            await video.save();
            return response.status(201).json({ message: "Video added successfully" });
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },

    async update(request, response) {
        const { title, link } = request.body;
    
        if (!title && !link) {
            return response.status(400).json({ error: "You must inform a new title or a new link." });
        }
    
        try {
            const video = request.video; 
    
            if (title) video.title = title;
            if (link) video.link = link;
    
            await video.save();
            return response.status(200).json({ message: "Video updated successfully", video });
        } catch (err) {
            return response.status(500).json({ error: err.message });
        }
    },
    async delete(request, response) {
        try {
            const video = request.video; // Obtido pelo middleware
            await Video.deleteOne({ id: video.id }); // Remove pelo ID
            return response.status(200).json({ message: "Video deleted successfully!" });
        } catch (err) {
            return response.status(500).json({ error: err.message });
        }
    },
    async updateLike(request, response) {
        try {
            const video = request.video; // Objeto 'video' vem do middleware
            video.liked = !video.liked; // Inverte o valor de 'liked'
            
            await video.save(); // Salva a alteração no banco de dados
            
            return response.status(200).json({
                message: `Video ${video.liked ? 'liked' : 'unliked'} successfully!`,
            });
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },  
};
