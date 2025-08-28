
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selections 
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarProfile = document.getElementById('sidbar-profile');
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const experienceList = document.getElementById('experience-list');
    const projectList = document.getElementById('project-list');
    const blogList = document.getElementById('blog-list');
    const blogContentArea = document.getElementById('blog-content-area');
    const blogContentDisplay = document.getElementById('blog-content-display');
    const closeBlogContentBtn = document.getElementById('close-blog-content');
    // Modal Elements
    const projectModal = document.getElementById('projectModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalDescriptionHeading = document.getElementById('modalDescriptionHeading');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechStack = document.getElementById('modalTechStack');
    const modalDetailsHeading = document.getElementById('modalDetailsHeading');
    const modalDetailedDescription = document.getElementById('modalDetailedDescription');
    const modalLinksHeading = document.getElementById('modalLinksHeading');
    const modalLinks = document.getElementById('modalLinks');
    const modalGallery = document.getElementById('modalGallery');
    const modalGalleryMainImage = document.getElementById('modalGalleryMainImage');
    const modalGalleryThumbnails = document.getElementById('modalGalleryThumbnails');

    let projectsLoaded = false;
    let experiencesLoaded = false;
    let blogsLoading = false;

    const blogFiles = [
        'my-first-blog.md',
    ];

    // --- Sidebar Toggle ---
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const icon = sidebarToggle.querySelector('i');
        sidebar.style.transition = 'width 0.3s ease-in-out';
        sidebarToggle.style.transition = 'right 0.3s ease-in-out';
        
        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '4rem';
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-right-to-bracket');
            sidebarToggle.classList.remove('-right-3');
            sidebarToggle.classList.add('right-5');
            sidebarProfile.style.transition = 'opacity 0.2s ease-in-out';
            sidebarProfile.classList.remove('flex');
            sidebarProfile.classList.add('hidden');
        } else {
            icon.classList.remove('fa-right-to-bracket');
            icon.classList.add('fa-chevron-left');
            sidebarToggle.classList.remove('right-6');
            sidebarToggle.classList.add('-right-3');
            setTimeout(() => {
                sidebarProfile.style.transition = 'opacity 0.3s ease-in-out';
                sidebarProfile.classList.remove('hidden');
                sidebarProfile.classList.add('flex');
            }, 100);
            sidebar.style.width = '16rem';
        }
    });

    // --- Navigation / Section Switching ---
    navLinks.forEach(link => {
        if (!link.href.includes('#') || link.href.startsWith('mailto:')) return;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            navLinks.forEach(lnk => lnk.classList.remove('active', 'bg-gray-700'));
            link.classList.add('active', 'bg-gray-700');
        });
    });

    function showSection(sectionId) {
        blogContentArea.classList.add('hidden'); // Hide blog reader view when switching main sections
        contentSections.forEach(section => {
            section.classList.toggle('hidden', section.id !== sectionId);
        });
        
        mainContent.scrollTop = 0; // Scroll to top of content area

        if (!window.location.hash.includes(sectionId)) {
            history.pushState(null, null, `#${sectionId}`);
        }

        // Load content synchronously if not already loaded
        if (sectionId === 'projects' && !projectsLoaded) {
            loadProjects();
        } else if (sectionId === 'experience' && !experiencesLoaded) {
            loadExperiences();
        } else if (sectionId === 'blogs' && blogList.children.length <= 1) { // Still load blogs async if needed
            loadBlogs();
        }
    }

    // --- Data defined directly in JS ---

    // Experience Data
    const experiencesData = [
        {
            id: "tech-musketeers-exp",
            company: "The Tech Musketeers",
            role: "Backend Developer",
            duration: "Sept 2024 - Feb 2025", // Update if needed
            location: "Remote",
            shortDescription: 'Backend development for an NGO proposal creation platform.',
            technologies: ['FastAPI', 'Stripe', 'Prisma', 'Supabase', 'Docker', 'OpenAI', 'NextJS'],
            galleryImages: [
                "https://lh3.googleusercontent.com/d/1sv1UvfwgBnHP1YzeAF9V4jme1fQOFIpA",
                "https://lh3.googleusercontent.com/d/1or9FOeOdmuJRy-XIpivD3F8BXMDdk2d-",
                "https://lh3.googleusercontent.com/d/1_ybekUuvBwpEnSW2mTORdpC1n_ZgeJKS", 
                "https://lh3.googleusercontent.com/d/1YLUbfGfSl91CgB0y_oGd_pSPLuza6aLQ", 
                "https://lh3.googleusercontent.com/d/11FjbwbQ56bs8mH9FaGknHhW4yKBZLvLh", 
                "https://lh3.googleusercontent.com/d/11UJMRQRjkJOgbXtMSXiCz4A9BBw_xWPf", 
                "https://lh3.googleusercontent.com/d/1OSyebKDyg6RHh2dqwAXPu2hIcLxjSIFw", 
                "https://lh3.googleusercontent.com/d/1pcoxyOrwvwiiyCz7WoCY5-DcS_rhv2rg"
            ],
            detailedDescription: `
                <ul class="list-disc list-inside space-y-1 mt-2">
                    <li>Created a platform for creating NGO proposals.</li>
                    <li>Built an AI-powered chatbot using OpenAI APIs, reducing proposal creation time by 40%.</li>
                    <li>Developed a multilevel access system (admin, editor, user) improving security and role management.</li>
                    <li>Created a robust search system for sample proposals, enhancing user experience.</li>
                    <li>Integrated Stripe for subscriptions, managing multiple plans via APIs and a user-friendly dashboard.</li>
                    <li>Developed admin dashboard APIs for user management, proposal tracking, and analytics.</li>
                    <li>Implemented proposal management APIs, increasing user engagement significantly.</li>
                </ul>
            `,
            githubLink: null,
            certificate: 'https://internshala.com/student/certificate/215297458/b2nn1xee313',
            liveLink: null, //'https://app.createyourproposal.com/',
        },
        // Add other experiences here following the same structure
    ];

    // Project Data
    const projectsData = [
        {
            id: 'mendgen-ai',
            title: 'MendGen AI (AI-Driven Healthcare Platform)',
            date: 'Oct 2024',
            shortDescription: 'AI-powered healthcare platform for disease diagnosis, image analysis, and telemedicine.',
            technologies: ['React.js', 'Python', 'Flask', 'Gemini', 'RAG', 'Cloudinary', 'ZegoCloud API'],
            youtubeLinks: ['https://www.youtube.com/watch?v=5NTnalbH-uA', 'https://www.youtube.com/watch?v=svE9v4AudoE'],
            galleryImages: [
                'https://github.com/user-attachments/assets/da5b416e-ee82-4adb-9889-cf68d58520db',
                'https://github.com/user-attachments/assets/96a7cdde-1ae7-4ac3-9451-a0bb67e37cbf',
                'https://github.com/user-attachments/assets/a1b115e5-472f-4e73-8bdc-16276b929357',
                'https://github.com/user-attachments/assets/4cddc856-79db-471c-be0f-db8ce29686ef',
                'https://github.com/user-attachments/assets/af1e9a36-1623-4fcc-a23d-550941cba7eb',
                'https://github.com/user-attachments/assets/030be940-5e08-4b83-bd06-9dbac0b933d3',
                'https://github.com/user-attachments/assets/891ebadc-1bf0-4718-b2e5-33f9dad1687a',
                'https://github.com/user-attachments/assets/beaafa46-459b-4413-81f2-8f99bbbac318',
                'https://github.com/user-attachments/assets/8c64edd3-c434-41cc-ab74-ea3c21938848',
                'https://github.com/user-attachments/assets/0f2c98b0-617b-4c00-b5fb-5e3a8a8f3d5d',
                'https://github.com/user-attachments/assets/a5fa5aff-5862-4ca0-aba3-42a2d9ff0c82',
            ], 
            detailedDescription: `<p>Developed an AI-powered healthcare platform featuring:</p><ul class="list-disc list-inside space-y-1 mt-2"><li>Intelligent disease diagnosis via symptom-based assessments.</li><li>Medical image analysis capabilities.</li><li>Treatment plan generation suggestions.</li><li>Integrated AI chatbot (text, image, audio inputs) for health queries using Gemini and RAG techniques.</li><li>Seamless video consultations using ZegoCloud API for improved telemedicine.</li></ul>`,
            githubLink: 'https://github.com/DevDynamo01/ATMEC-Medical-Project-',
            liveLink: null
        },
        {
            id: 'crudcy',
            title: 'Crudcy (A coding platform)',
            date: 'Sept 2023',
            shortDescription: 'Online compiler supporting multiple languages with secure Docker containerization.',
            technologies: ['NodeJS', 'Express', 'Docker', 'NextJS', 'Monaco Editor'],
            galleryImages: [
                'https://github.com/chaman56/Crudcy/assets/76009420/85040f58-8d2f-4fe6-9130-308c9e4b99d1', 
                'https://github.com/chaman56/Crudcy/assets/76009420/1af76fd8-97f5-4608-aae8-3106917fb76f', 
                'https://github.com/chaman56/Crudcy/assets/76009420/283d0fc7-47b8-4002-8b65-58a996463423'],
            detailedDescription: `<p>Built a feature-rich online coding platform:</p><ul class="list-disc list-inside space-y-1 mt-2"><li>Implemented secure, isolated code execution using Docker containers, increasing user trust.</li><li>Supported multiple programming languages (C++, C, Python, Java) with optimized containerization for efficiency.</li><li>Crafted an intuitive frontend with Next.js and integrated the Monaco Editor, leading to a 50% increase in user satisfaction and a 20% reduction in code writing errors.</li></ul>`,
            githubLink: 'https://github.com/chaman56/crudcy',
            liveLink: null
        },
         {
            id: 'smartvids',
            title: 'Smartvids (AI video generation)',
            date: 'June 2024',
            shortDescription: 'Platform to create AI videos from text prompts, automating scriptwriting, voiceovers, and visuals.',
            technologies: ['Next.js', 'MongoDB', 'Prisma', 'Clerk', 'Stability AI', 'Stable Diffusion', "Google's Gemini", 'ElevenLabs'],
            youtubeLinks: ['https://www.youtube.com/watch?v=lxVf5OL0Z4A'],
            galleryImages: [
               'https://lh3.googleusercontent.com/d/1MnXUjwa4wxdt02PUmHRn4VSl0yiMNtol',
               'https://lh3.googleusercontent.com/d/1ZvEj5uImzdMU9AUpmKRmSZP4fxF0Z4Ef',
               'https://lh3.googleusercontent.com/d/1mmiRxQRQUPFc0aYe3q3rCUieSCcnYac7',
            ],
            detailedDescription: `<p>Developed an AI-driven platform that generates complete videos from simple text prompts:</p><ul class="list-disc list-inside space-y-1 mt-2"><li>Automated scriptwriting using Google's Gemini.</li><li>Generated realistic TTS voiceovers with ElevenLabs.</li><li>Created custom visuals using Stable Diffusion & Stability AI, reducing reliance on stock content.</li><li>Automated the video assembly process, cutting production time by 60% and manual editing by 70%.</li><li>Built a scalable Next.js web interface with MongoDB & Prisma for data management.</li></ul>`,
            githubLink: 'https://github.com/chaman56/smartvids',
            liveLink: null
        },
        {
            id: 'ai-kart',
            title: 'Ai-Kart (Marketplace for AI apps)',
            date: 'March 2024',
            shortDescription: 'Web app for creating custom AI apps using prompts and a marketplace for sharing them.',
            technologies: ["Google's Gemini", 'LLM', 'NodeJS', 'ReactJS', 'Firebase', 'Vector Embeddings'],
            youtubeLinks: ['https://www.youtube.com/watch?v=5bQuESXjQx8'],
            galleryImages: [
                'https://github.com/chaman56/aikart/assets/76009420/b717bdf5-7e65-43cf-ae40-9187599bdc44',
                'https://github.com/chaman56/aikart/assets/76009420/e0148d53-0c96-47c3-9227-76d58d6cd9a1',
                'https://github.com/chaman56/aikart/assets/76009420/9712ac2d-ba66-49c0-9ca8-5fddd85c6c92'
            ],
            detailedDescription: `<p>Developed a cutting-edge web application empowering users to build and share AI tools:</p><ul class="list-disc list-inside space-y-1 mt-2"><li>Enabled users to create custom AI apps with detailed prompts, significantly reducing app creation time.</li><li>Integrated Gemini API and vector embeddings for precise prompt engineering with user data.</li><li>Launched a marketplace allowing users to publish and monetize their custom AI apps, fostering user engagement and accelerating AI solution deployment.</li></ul>`,
            githubLink: 'https://github.com/chaman56/aikart',
            liveLink: 'https://aikart.vercel.app/'
        },
         {
            id: 'recommendation-system',
            title: 'Movie Recommendation System',
            date: 'Jan 2024',
            shortDescription: 'Recommends similar movies based on content using NLP.',
            technologies: ['Python', 'Pandas', 'Sklearn', 'NLP', 'CountVectorizer', 'Cosine Similarity', 'Matplotlib'],
            galleryImages: [
                'https://github.com/chaman56/Movie_Recommender/assets/76009420/c80322a0-52cc-4e44-8405-19592a3d037b'
            ],
            detailedDescription: `<p>Built a movie recommender system using the TMDB Dataset:</p><ul class="list-disc list-inside space-y-1 mt-2"><li>Implemented vectorization of text features (like overview, genres, keywords) using CountVectorizer.</li><li>Calculated movie similarity using a cosine similarity matrix.</li><li>Enabled accurate prediction of the top 5 most similar movies based on content.</li><li>Utilized advanced NLP techniques for feature extraction and preprocessing.</li></ul>`,
            githubLink: 'https://github.com/chaman56/Movie_Recommender',
            liveLink: null
        },
        {
            id: 'stbay',
            title: 'Stbay (Ecommerce WebApp)',
            date: 'June 2023',
            shortDescription: 'Campus ecommerce app for students to sell, buy, and rent goods.',
            technologies: ['NodeJS', 'Express', 'MongoDB', 'EJS', 'Nodemailer'],
            youtubeLinks: ['https://www.youtube.com/watch?v=qDcpoXq4f10'],
            galleryImages: [
                'https://lh3.googleusercontent.com/d/1-aXhfwdTgUjvHiPPNQkPTdBzyuXxq7Vv',
                'https://lh3.googleusercontent.com/d/15IyJNO6uFfHQTOtK1oXYj0us5BHJBLd-',
                'https://lh3.googleusercontent.com/d/180vmhWhqxfnJawbowTYUFD9xhcniXETu',
                'https://lh3.googleusercontent.com/d/1HhjCg8elbUHlKkw_E2cYA9w_KLemv9lM',
                'https://lh3.googleusercontent.com/d/1IG8_4-W2SY-ZWvHf-ZsnJIqHjgc3RoXs',
                'https://lh3.googleusercontent.com/d/1ZamEE3Rpak1lKb329eO39QZQOA2nxVMU',
                'https://lh3.googleusercontent.com/d/1cNU7u27TpTZ80YAGxRgYScynAWtu8Eib',
                'https://lh3.googleusercontent.com/d/1mdc4vCFuGUgS5d2pPVZl88j3n_yX8PrG',
            ],
            detailedDescription: `<p>Created an ecommerce web application specifically for campus students:</p><ul class="list-disc list-inside space-y-1 mt-2"><li>Allowed students to easily list items for selling, buying, or renting.</li><li>Engineered a robust backend using Express.js and MongoDB for seamless data management and transactions.</li><li>Integrated an email notification service using Nodemailer for user updates (e.g., new listings, messages).</li></ul>`,
            githubLink: 'https://github.com/chaman56/Stbay',
            liveLink: null
        },
        // Add other projects here following the same structure
    ];

    // --- Load Projects ---
    function loadProjects() {
        if (projectsLoaded) return;
        projectList.innerHTML = ''; // Clear loading/previous

        if (!projectsData || projectsData.length === 0) {
             projectList.innerHTML = '<p class="text-gray-500 col-span-full text-center">No projects added yet.</p>';
             return;
        }

        projectsData.forEach(project => {
            if (!project || !project.id) return; // Basic check for valid project entry
            const card = document.createElement('div');
            card.className = 'bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 transition-all duration-300 cursor-pointer project-card';
            card.dataset.itemId = project.id;
            card.dataset.itemType = 'project';

             card.innerHTML = `
                 <h3 class="text-lg font-semibold text-blue-400 mb-1">${project.title || 'Untitled Project'}</h3>
                 <p class="text-sm text-gray-400 mb-2">${project.date || ''}</p>
                 <p class="text-sm text-gray-300 mb-3">${project.shortDescription || ''}</p>
                 <div class="flex flex-wrap gap-1">
                     ${(project.technologies || []).map(tech => `<span class="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded">${tech}</span>`).join('')}
                 </div>
             `;
            card.addEventListener('click', () => openDetailModal(card.dataset.itemId, card.dataset.itemType));
            projectList.appendChild(card);
        });
        projectsLoaded = true;
    }

    // --- Experience Loading ---
    function loadExperiences() {
        if (experiencesLoaded) return;
        experienceList.innerHTML = ''; // Clear loading/previous

        if (!experiencesData || experiencesData.length === 0) {
            experienceList.innerHTML = '<p class="text-gray-500 text-center">No experience added yet.</p>';
            return;
        }

        experiencesData.forEach(experience => {
            if (!experience || !experience.id) return; // Basic check for valid experience entry
            const card = document.createElement('div');
            card.className = 'bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 transition-all duration-300 cursor-pointer experience-card';
            card.dataset.itemId = experience.id;
            card.dataset.itemType = 'experience';

             card.innerHTML = `
                <div class="flex justify-between items-start mb-1">
                     <h3 class="text-lg font-semibold text-teal-400">${experience.role || 'Role'} at ${experience.company || 'Company'}</h3>
                     
                </div>
                 <p class="text-md text-gray-300 mb-1">${experience.shortDescription || 'Description'}</p>
                 <p class="text-sm text-gray-400 mb-2">${experience.duration || ''}</p>
                 ${experience.location ? `<p class="text-sm text-gray-500 mb-3"><i class="fas fa-map-marker-alt mr-1"></i>${experience.location}</p>` : '<p class="mb-3"></p>'}
                 <div class="flex flex-wrap gap-1">
                     ${(experience.technologies || []).map(tech => `<span class="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded">${tech}</span>`).join('')}
                 </div>
             `;
            card.addEventListener('click', () => openDetailModal(card.dataset.itemId, card.dataset.itemType));
            openDetailModal(card.dataset.itemId, card.dataset.itemType);
            experienceList.appendChild(card);
        });
        experiencesLoaded = true;
    }

    // --- Detail Modal Logic (REVISED) ---
    function openDetailModal(itemId, itemType) {
        let data;
        try {
            // Find data from the correct array
            if (itemType === 'project') {
                data = projectsData.find(p => p.id === itemId);
            } else if (itemType === 'experience') {
                data = experiencesData.find(e => e.id === itemId);
            } else {
                throw new Error(`Unknown item type for modal: ${itemType}`);
            }

            // Ensure data was found
            if (!data) {
                throw new Error(`Data not found for ${itemType} ID: ${itemId}`);
            }

            // --- Populate Modal based on Type ---
            if (itemType === 'project') {
                modalTitle.textContent = data.title || 'Project Details';
                modalSubtitle.textContent = data.date || '';
                modalSubtitle.classList.toggle('hidden', !data.date);
                modalDescriptionHeading.textContent = "Overview:";
                modalDetailsHeading.textContent = "Detailed Explanation:";
                // modalLinksHeading.textContent = "Links:";

            } else if (itemType === 'experience') {
                modalTitle.textContent = `${data.role || 'Role'} at ${data.company || 'Company'}`;
                modalSubtitle.textContent = data.duration || '';
                modalSubtitle.classList.toggle('hidden', !data.duration);
                modalDescriptionHeading.textContent = "Overview:"; // Using consistent heading
                modalDetailsHeading.textContent = "Detailed Explanation:";
                // modalLinksHeading.textContent = "Related Links:";
            }

            // --- Populate Common & Conditional Fields ---

            // Overview (using shortDescription)
            modalDescription.textContent = data.shortDescription || '';

            // Technologies
            modalTechStack.innerHTML = (data.technologies || [])
                .map(tech => `<span class="bg-blue-900 text-blue-200 text-sm font-medium me-2 px-2.5 py-0.5 rounded">${tech}</span>`)
                .join('');

            // Detailed Description (Set as innerHTML directly)
            modalDetailedDescription.innerHTML = data.detailedDescription || '<p class="text-gray-500">No details provided.</p>';

            // Youtube Video 
            function getYoutubeVideoId(url) {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = url.match(regExp);
                return (match && match[2].length === 11) ? match[2] : null;
            }

            const modalGalleryMainContent = document.querySelector('.modalGalleryMainContent');
            const galleryItems = [];

            const youtubeLinks = data.youtubeLinks || [];
            youtubeLinks.forEach(youtubeLink => {
                galleryItems.push({
                    type: 'youtube',
                    url: youtubeLink,
                    id: getYoutubeVideoId(youtubeLink)
                });
            });
            
            const galleryImages = data.galleryImages || [];
            galleryImages.forEach(imgUrl => {
                galleryItems.push({
                    type: 'image',
                    url: imgUrl
                });
            });

            if (galleryItems.length > 0) {
                modalGallery.classList.remove('hidden');
                modalGalleryThumbnails.innerHTML = ''; // Clear previous thumbs

                // Set the initial content (first item)
                const firstItem = galleryItems[0];
                if (firstItem.type === 'youtube') {
                    // Set YouTube video as main content
                    modalGalleryMainContent.innerHTML = `
                        <div class="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src="https://www.youtube-nocookie.com/embed/${firstItem.id}" 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                class="rounded-lg"
                            ></iframe>
                        </div>
                    `;
                } else {
                    // Set image as main content
                    modalGalleryMainContent.innerHTML = `
                        <img src="${firstItem.url}" alt="${data.title || data.company || 'Item'} screenshot" 
                            class="w-full h-64 md:h-96 object-contain rounded bg-gray-700" id="modalGalleryMainImage">
                    `;
                }

                // Create thumbnails for all items
                galleryItems.forEach((item, index) => {
                    const thumb = document.createElement('div');
                    thumb.className = 'gallery-thumbnail w-20 h-20 md:w-[150px] md:h-[120px] relative rounded cursor-pointer border-2 border-transparent hover:border-blue-500 opacity-70 hover:opacity-100 transition-all duration-200 flex-shrink-0';

                    if (index === 0) {
                        thumb.classList.add('active-thumbnail');
                        thumb.classList.remove('opacity-70');
                    }

                    if (item.type === 'youtube') {
                        // YouTube thumbnail
                        thumb.innerHTML = `
                            <img src="https://img.youtube.com/vi/${item.id}/mqdefault.jpg" 
                                alt="Video thumbnail" class="w-full h-full object-cover rounded">
                            <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                                <i class="fas fa-play text-white"></i>
                            </div>
                        `;
                    } else {
                        // Image thumbnail
                        thumb.innerHTML = `
                            <img src="${item.url}" alt="${data.title || data.company || 'Item'} thumbnail ${index + 1}" 
                                class="w-full h-full object-cover rounded">
                        `;
                    }

                    // Add click handler
                    thumb.addEventListener('click', () => {
                        // Update main content based on item type
                        if (item.type === 'youtube') {
                            modalGalleryMainContent.innerHTML = `
                                <div class="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                                    <iframe 
                                        width="100%" 
                                        height="100%" 
                                        src="https://www.youtube-nocookie.com/embed/${item.id}" 
                                        title="YouTube video player" 
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen
                                        class="rounded-lg"
                                    ></iframe>
                                </div>
                            `;
                        } else {
                            modalGalleryMainContent.innerHTML = `
                                <img src="${item.url}" alt="${data.title || data.company || 'Item'} screenshot ${index + 1}" 
                                    class="w-full h-64 md:h-96 object-contain rounded bg-gray-700" id="modalGalleryMainImage">
                            `;
                        }

                        // Update active thumbnail
                        document.querySelectorAll('#modalGalleryThumbnails .gallery-thumbnail').forEach(t => {
                            t.classList.remove('active-thumbnail');
                            t.classList.add('opacity-70');
                        });
                        thumb.classList.add('active-thumbnail');
                        thumb.classList.remove('opacity-70');
                    });

                    modalGalleryThumbnails.appendChild(thumb);
                });
            } else {
                modalGallery.classList.add('hidden'); // Hide if no gallery items
            }

            // Links
            modalLinks.innerHTML = ''; // Clear previous links
            const hasGithubLink = !!data.githubLink;
            const hasLiveLink = !!data.liveLink;
            const hascertificate = !!data.certificate;

            if (hascertificate) {
                modalLinks.innerHTML += `<a href="${data.certificate}" target="_blank" rel="noopener noreferrer" class="text-green-400 hover:text-green-300 hover:underline"><i class="fas fa-external-link-alt mr-1"></i> Certificate</a>`;
            }
            if (hasGithubLink) {
                modalLinks.innerHTML += `<a href="${data.githubLink}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 hover:underline ${hascertificate ? 'ml-4' : ''}"><i class="fab fa-github mr-1"></i> GitHub</a>`;
            }
            if (hasLiveLink) {
                modalLinks.innerHTML += `<a href="${data.liveLink}" target="_blank" rel="noopener noreferrer" class="text-green-400 hover:text-green-300 hover:underline ${hasGithubLink ? 'ml-4' : ''}"><i class="fas fa-external-link-alt mr-1"></i> Live Website</a>`;
            }

            // Show/Hide Links section
            if (hasGithubLink || hasLiveLink || hascertificate) {
                modalLinks.classList.remove('hidden');
                // modalLinksHeading.classList.remove('hidden');
            } else {
                 modalLinks.classList.add('hidden');
                //  modalLinksHeading.classList.add('hidden');
            }


            // --- Show the Modal ---
            projectModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            const modalContentArea = projectModal.querySelector('.bg-gray-800');
            if(modalContentArea) { modalContentArea.scrollTop = 0; } // Scroll modal to top

        } catch (error) {
            console.error("Error in openDetailModal:", error);
            alert(`An error occurred while trying to load details: ${error.message}`);
            closeProjectModal(); // Ensure modal is closed/reset on error
        }
    }

    // --- Close Modal Function ---
    function closeProjectModal() {
        projectModal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore background scroll
        // Clear modal content
        modalTitle.textContent = "Details";
        modalSubtitle.textContent = "";
        modalDescription.textContent = "";
        modalDetailedDescription.innerHTML = "";
        modalTechStack.innerHTML = "";
        modalLinks.innerHTML = "";
        modalGalleryMainImage.src = "";
        modalGalleryThumbnails.innerHTML = "";
        modalGallery.classList.add('hidden');
        modalLinks.classList.add('hidden');
        modalLinksHeading.classList.add('hidden');
    }
    closeModalBtn.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (event) => { if (event.target === projectModal) { closeProjectModal(); } });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !projectModal.classList.contains('hidden')) { closeProjectModal(); } });


    // --- Blog Loading (Assuming marked.js is included in HTML for this) ---

    async function loadBlogs() {
        blogsLoading = true;
        blogList.innerHTML = ''; // Clear loading/previous
        if (!blogFiles || blogFiles.length === 0) {
            blogList.innerHTML = '<p class="text-gray-500 text-center">No blog posts listed yet.</p>';
            return;
        }

        const fetchPromises = blogFiles.map(async (filename) => {
            const blogPath = `./blogs/${filename}`;
            try {
                const response = await fetch(blogPath);
                if (!response.ok) { throw new Error(`Status ${response.status}`); }
                const markdown = await response.text();
                const titleMatch = markdown.match(/^#\s+(.*)/);
                let title = titleMatch ? titleMatch[1] : filename.replace(/\.md$/i, '').replace(/[-_]/g, ' ');
                title = title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
                return { filename, title, markdown, error: false };
            } catch (error) {
                console.error(`Error fetching/processing blog ${filename}:`, error);
                return { filename, title: `Error loading: ${filename}`, markdown: null, error: true };
            }
        });

        const blogResults = await Promise.all(fetchPromises);
        let blogsDisplayed = 0;
        blogResults.forEach(blogData => {
            const listItem = document.createElement('div');
            listItem.className = 'bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 transition-all duration-300';
            if (!blogData.error) {
                listItem.classList.add('cursor-pointer');
                listItem.innerHTML = `<h3 class="text-lg font-semibold text-purple-400 mb-1">${blogData.title}</h3><p class="text-sm text-gray-500">${blogData.filename}</p>`;
                listItem.dataset.markdown = blogData.markdown;
                listItem.dataset.title = blogData.title;
                listItem.addEventListener('click', () => displayBlogContent(listItem.dataset.markdown, listItem.dataset.title));
                blogsDisplayed++;
            } else {
                 listItem.innerHTML = `<h3 class="text-lg font-semibold text-red-400 mb-1">${blogData.title}</h3><p class="text-sm text-gray-500">Could not load content.</p>`;
            }
            blogList.appendChild(listItem);
        });

        if(blogsDisplayed === 0 && blogFiles.length > 0) {
             blogList.innerHTML = '<p class="text-gray-500 text-center">Could not load any blog posts. Check console/network.</p>';
        }
        blogsLoading = false;
    }

    // --- Display Blog Content ---
    function displayBlogContent(markdown, title) {
        if (typeof marked === 'undefined') {
            console.error('Marked library is not loaded! Cannot parse blog content.');
            blogContentDisplay.innerHTML = `<h2 class="text-2xl font-bold mb-4 text-gray-100">${title}</h2><p class="text-red-400">Error: Cannot render Markdown content.</p>`;
        } else {
            try {
                const htmlContent = marked.parse(markdown || ''); // Parse the markdown
                blogContentDisplay.innerHTML = htmlContent;
            } catch (error) {
                console.error("Error parsing blog markdown:", error);
                blogContentDisplay.innerHTML = `<h2 class="text-2xl font-bold mb-4 text-gray-100">${title}</h2><p class="text-red-400">Error rendering this blog post.</p>`;
            }
        }
        blogContentArea.classList.remove('hidden');
        blogContentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

     // --- Close Blog Content Area ---
     closeBlogContentBtn.addEventListener('click', () => {
         blogContentArea.classList.add('hidden');
         blogContentDisplay.innerHTML = '';
     });

    function handleInitialNavigation() {
        const initialSection = window.location.hash ? window.location.hash.substring(1) : 'about';
        const validSections = Array.from(contentSections).map(s => s.id);
        const sectionToShow = validSections.includes(initialSection) ? initialSection : 'about';

        // Set active link first
        navLinks.forEach(lnk => {
             lnk.classList.remove('active', 'bg-gray-700');
             if (lnk.getAttribute('href') === `#${sectionToShow}`) {
                 lnk.classList.add('active', 'bg-gray-700');
             }
         });
        // Then show the section (which might trigger loading)
        showSection(sectionToShow);
    }

    handleInitialNavigation();
    window.addEventListener('hashchange', handleInitialNavigation);

}); 