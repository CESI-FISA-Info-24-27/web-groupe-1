-- ************************* Données fictives pour CERCLE *************************
-- ****************** Jeu de données de test ******************

-- Insertion de tags
INSERT INTO cercle.tags (tag) VALUES 
('sport'),
('technologie'),
('cuisine'),
('voyage'),
('musique'),
('art'),
('science'),
('politique'),
('nature'),
('cinema'),
('litterature'),
('gaming'),
('fitness'),
('mode'),
('humour');

-- Insertion d'utilisateurs
INSERT INTO cercle.users (nom, prenom, username, mail, password_hash, telephone, bio, photo_profil, id_role, "private", certified, is_active, created_at, updated_at) VALUES 
('Dupont', 'Jean', 'jean_dupont', 'jean.dupont@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456789', 'Passionné de technologie et de voyage', 'profil1.jpg', 1, false, false, true, NOW() - INTERVAL '6 months', NOW()),
('Martin', 'Sophie', 'sophie_martin', 'sophie.martin@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567890', 'Artiste et créatrice de contenu', 'profil2.jpg', 1, false, true, true, NOW() - INTERVAL '5 months', NOW()),
('Leroy', 'Thomas', 'thomas_leroy', 'thomas.leroy@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678901', 'Chef cuisinier, amateur de bonne bouffe', 'profil3.jpg', 1, false, false, true, NOW() - INTERVAL '4 months', NOW()),
('Moreau', 'Emma', 'emma_moreau', 'emma.moreau@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0456789012', 'Sportive et aventurière', 'profil4.jpg', 1, true, false, true, NOW() - INTERVAL '3 months', NOW()),
('Bernard', 'Lucas', 'lucas_bernard', 'lucas.bernard@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0567890123', 'Développeur passionné de gaming', 'profil5.jpg', 1, false, false, true, NOW() - INTERVAL '2 months', NOW()),
('Dubois', 'Camille', 'camille_dubois', 'camille.dubois@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901234', 'Photographe et amatrice de nature', 'profil6.jpg', 1, false, true, true, NOW() - INTERVAL '1 month', NOW()),
('Robert', 'Pierre', 'pierre_robert', 'pierre.robert@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012345', 'Modérateur de la communauté', 'profil7.jpg', 2, false, true, true, NOW() - INTERVAL '8 months', NOW()),
('Petit', 'Marie', 'marie_petit', 'marie.petit@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123456', 'Passionnée de littérature et cinema', 'profil8.jpg', 1, false, false, true, NOW() - INTERVAL '7 months', NOW()),
('Durand', 'Antoine', 'antoine_durand', 'antoine.durand@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234567', 'Musicien et compositeur', 'profil9.jpg', 1, true, false, true, NOW() - INTERVAL '9 months', NOW()),
('Roux', 'Julie', 'julie_roux', 'julie.roux@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456780', 'Administratrice', 'profil10.jpg', 3, false, true, true, NOW() - INTERVAL '12 months', NOW()),
('Garnier', 'Maxime', 'maxime_garnier', 'maxime.garnier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567891', 'Fan de science et innovation', 'profil11.jpg', 1, false, false, true, NOW() - INTERVAL '10 days', NOW()),
('Faure', 'Léa', 'lea_faure', 'lea.faure@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678902', 'Influenceuse mode et lifestyle', 'profil12.jpg', 1, false, true, true, NOW() - INTERVAL '15 days', NOW());

-- Insertion des préférences utilisateur
INSERT INTO cercle.user_preferences (id_user, id_langue, email_notification, id_theme) VALUES 
(1, 1, true, 1),   -- Jean Dupont
(2, 1, false, 2),  -- Sophie Martin
(3, 1, true, 1),   -- Thomas Leroy
(4, 2, true, 2),   -- Emma Moreau
(5, 1, false, 2),  -- Lucas Bernard
(6, 1, true, 1),   -- Camille Dubois
(7, 1, true, 1),   -- Pierre Robert
(8, 1, false, 2),  -- Marie Petit
(9, 2, true, 1),   -- Antoine Durand
(10, 1, true, 1),  -- Julie Roux
(11, 1, false, 2), -- Maxime Garnier
(12, 1, true, 1);  -- Léa Faure

-- Insertion de relations de follow
INSERT INTO cercle.follow (follower, account, pending, active, notif_view, created_at, updated_at) VALUES 
(1, 2, false, true, true, NOW() - INTERVAL '1 month', NOW()),
(1, 3, false, true, false, NOW() - INTERVAL '2 months', NOW()),
(1, 6, false, true, true, NOW() - INTERVAL '3 weeks', NOW()),
(2, 1, false, true, true, NOW() - INTERVAL '1 month', NOW()),
(2, 4, false, true, false, NOW() - INTERVAL '2 weeks', NOW()),
(2, 8, false, true, true, NOW() - INTERVAL '1 week', NOW()),
(3, 1, false, true, true, NOW() - INTERVAL '2 months', NOW()),
(3, 5, false, true, false, NOW() - INTERVAL '10 days', NOW()),
(4, 2, true, false, false, NOW() - INTERVAL '1 day', NOW()),
(4, 6, false, true, true, NOW() - INTERVAL '1 month', NOW()),
(5, 1, false, true, true, NOW() - INTERVAL '5 days', NOW()),
(5, 11, false, true, false, NOW() - INTERVAL '3 days', NOW()),
(6, 2, false, true, true, NOW() - INTERVAL '2 weeks', NOW()),
(6, 9, false, true, true, NOW() - INTERVAL '1 week', NOW()),
(8, 3, false, true, false, NOW() - INTERVAL '2 weeks', NOW()),
(9, 8, false, true, true, NOW() - INTERVAL '1 week', NOW()),
(11, 5, false, true, true, NOW() - INTERVAL '2 days', NOW()),
(12, 2, false, true, true, NOW() - INTERVAL '1 day', NOW());

-- Insertion de posts
INSERT INTO cercle.post (id_user, post_parent, content, id_message_type, active, created_at, updated_at) VALUES 
(1, NULL, 'Bonjour tout le monde ! Premier post sur cette plateforme 🚀 #technologie', 1, true, NOW() - INTERVAL '5 days', NOW()),
(2, NULL, 'Nouvelle œuvre terminée ! Qu''en pensez-vous ? #art #creation', 1, true, NOW() - INTERVAL '4 days', NOW()),
(3, NULL, 'Recette du jour : risotto aux champignons ! Un délice 🍄 #cuisine #recette', 1, true, NOW() - INTERVAL '3 days', NOW()),
(4, NULL, 'Trail matinal de 15km ! Rien de mieux pour commencer la journée 🏃‍♀️ #sport #running', 1, true, NOW() - INTERVAL '2 days', NOW()),
(5, NULL, 'Nouveau jeu indie découvert, c''est un chef-d''œuvre ! #gaming #indie', 1, true, NOW() - INTERVAL '1 day', NOW()),
(6, NULL, 'Coucher de soleil magnifique depuis la montagne 🌅 #nature #photographie', 1, true, NOW() - INTERVAL '12 hours', NOW()),
(8, NULL, 'Livre de la semaine : "L''Étranger" de Camus. Toujours aussi puissant ! #litterature', 1, true, NOW() - INTERVAL '6 hours', NOW()),
(9, NULL, 'Nouvelle composition en cours... Inspiration jazz fusion 🎵 #musique #composition', 1, true, NOW() - INTERVAL '3 hours', NOW()),
(11, NULL, 'Découverte fascinante en physique quantique ! L''univers nous réserve encore des surprises #science', 1, true, NOW() - INTERVAL '2 hours', NOW()),
(12, NULL, 'Look du jour ! Tendance automne/hiver qui arrive 🍂 #mode #style', 1, true, NOW() - INTERVAL '1 hour', NOW()),
-- Quelques réponses
(1, 2, 'Superbe travail Sophie ! Tu as un talent incroyable 👏', 2, true, NOW() - INTERVAL '3 days 12 hours', NOW()),
(3, 4, 'Bravo Emma ! Tu me motives à reprendre le sport', 2, true, NOW() - INTERVAL '1 day 18 hours', NOW()),
(2, 3, 'Mmm ça donne envie ! Tu partages la recette complète ?', 2, true, NOW() - INTERVAL '2 days 20 hours', NOW()),
(5, 8, 'Camus, un classique ! As-tu lu "La Peste" aussi ?', 2, true, NOW() - INTERVAL '5 hours', NOW()),
(6, 9, 'Hâte d''entendre le résultat ! J''adore le jazz fusion', 2, true, NOW() - INTERVAL '2 hours 30 minutes', NOW());

-- Insertion de tags pour les posts
INSERT INTO cercle.post_tags (id_post, id_tag) VALUES 
(1, 2),  -- technologie
(2, 6),  -- art
(3, 3),  -- cuisine
(4, 1),  -- sport
(5, 12), -- gaming
(6, 9),  -- nature
(7, 11), -- litterature
(8, 5),  -- musique
(9, 7),  -- science
(10, 14), -- mode
(3, 15), -- humour (post cuisine)
(4, 13), -- fitness (post sport)
(6, 6),  -- art (post photo)
(8, 6),  -- art (post musique)
(10, 6); -- art (post mode)

-- Insertion de médias pour certains posts
INSERT INTO cercle.img_vid_post (id_post, id_media, lien_media) VALUES 
(2, 1, 'https://example.com/images/artwork_sophie_1.jpg'),
(3, 1, 'https://example.com/images/risotto_champignons.jpg'),
(4, 1, 'https://example.com/images/trail_morning.jpg'),
(5, 1, 'https://example.com/images/indie_game_screenshot.jpg'),
(6, 1, 'https://example.com/images/sunset_mountain.jpg'),
(8, 2, 'https://example.com/videos/jazz_composition_preview.mp4'),
(10, 1, 'https://example.com/images/autumn_look.jpg'),
(2, 1, 'https://example.com/images/artwork_sophie_2.jpg'),
(6, 1, 'https://example.com/images/mountain_landscape.jpg'),
(10, 1, 'https://example.com/images/style_details.jpg');

-- Insertion de likes
INSERT INTO cercle.likes (id_user, id_post, active, notif_view, created_at, updated_at) VALUES 
(2, 1, true, true, NOW() - INTERVAL '4 days 20 hours', NOW()),
(3, 1, true, false, NOW() - INTERVAL '4 days 18 hours', NOW()),
(6, 1, true, true, NOW() - INTERVAL '4 days 12 hours', NOW()),
(1, 2, true, true, NOW() - INTERVAL '3 days 22 hours', NOW()),
(4, 2, true, false, NOW() - INTERVAL '3 days 15 hours', NOW()),
(8, 2, true, true, NOW() - INTERVAL '3 days 10 hours', NOW()),
(1, 3, true, true, NOW() - INTERVAL '2 days 22 hours', NOW()),
(2, 3, true, true, NOW() - INTERVAL '2 days 20 hours', NOW()),
(5, 3, true, false, NOW() - INTERVAL '2 days 16 hours', NOW()),
(2, 4, true, true, NOW() - INTERVAL '1 day 20 hours', NOW()),
(3, 4, true, true, NOW() - INTERVAL '1 day 18 hours', NOW()),
(6, 4, true, false, NOW() - INTERVAL '1 day 12 hours', NOW()),
(1, 5, true, true, NOW() - INTERVAL '23 hours', NOW()),
(11, 5, true, true, NOW() - INTERVAL '20 hours', NOW()),
(2, 6, true, true, NOW() - INTERVAL '11 hours', NOW()),
(4, 6, true, false, NOW() - INTERVAL '10 hours', NOW()),
(9, 6, true, true, NOW() - INTERVAL '8 hours', NOW()),
(3, 7, true, true, NOW() - INTERVAL '5 hours', NOW()),
(5, 8, true, true, NOW() - INTERVAL '2 hours 45 minutes', NOW()),
(12, 10, true, true, NOW() - INTERVAL '45 minutes', NOW());

-- Insertion de mentions
INSERT INTO cercle.mentions (id_user, id_post, notif_view) VALUES 
(2, 11, true),  -- Jean mentionne Sophie dans sa réponse
(4, 12, false), -- Thomas mentionne Emma dans sa réponse
(3, 13, true),  -- Sophie mentionne Thomas dans sa réponse
(8, 14, false), -- Lucas mentionne Marie dans sa réponse
(9, 15, true);  -- Camille mentionne Antoine dans sa réponse

-- Insertion de messages privés
INSERT INTO cercle.messages_prives (sender, receiver, message, send_at, read_at, active, updated_at) VALUES 
(1, 2, 'Salut Sophie ! J''ai adoré ton dernier post artistique, tu as vraiment du talent !', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day 20 hours', true, NOW()),
(2, 1, 'Merci beaucoup Jean ! Ça me fait vraiment plaisir 😊', NOW() - INTERVAL '1 day 20 hours', NOW() - INTERVAL '1 day 18 hours', true, NOW()),
(3, 4, 'Emma, tu pourrais me donner quelques conseils pour reprendre le sport ?', NOW() - INTERVAL '1 day', NOW() - INTERVAL '18 hours', true, NOW()),
(4, 3, 'Avec plaisir Thomas ! On peut se faire une séance ensemble si tu veux', NOW() - INTERVAL '18 hours', NOW() - INTERVAL '16 hours', true, NOW()),
(5, 11, 'Maxime, as-tu vu le dernier article sur l''IA ? Fascinant !', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '10 hours', true, NOW()),
(11, 5, 'Oui Lucas ! C''est exactement le genre de sujet qui me passionne', NOW() - INTERVAL '10 hours', NOW() - INTERVAL '8 hours', true, NOW()),
(6, 9, 'Antoine, j''aimerais beaucoup entendre ta nouvelle composition !', NOW() - INTERVAL '6 hours', NULL, true, NOW()),
(8, 12, 'Léa, où as-tu trouvé cette superbe veste ?', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '2 hours', true, NOW()),
(12, 8, 'Dans une petite boutique vintage du centre-ville ! Je t''envoie l''adresse', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 30 minutes', true, NOW()),
(7, 10, 'Julie, nous avons plusieurs signalements à traiter aujourd''hui', NOW() - INTERVAL '4 hours', NOW() - INTERVAL '3 hours 30 minutes', true, NOW()),
(10, 7, 'Parfait Pierre, je regarde ça dans la journée', NOW() - INTERVAL '3 hours 30 minutes', NOW() - INTERVAL '3 hours', true, NOW()),
(1, 6, 'Camille, tes photos de nature sont toujours aussi magnifiques !', NOW() - INTERVAL '1 hour', NULL, true, NOW());

-- Insertion de quelques signalements
INSERT INTO cercle.report (id_user, id_post, reported_at, raison) VALUES 
(7, 5, NOW() - INTERVAL '2 hours', 'Contenu inapproprié pour les mineurs'),
(10, 9, NOW() - INTERVAL '1 hour', 'Informations scientifiques non vérifiées'),
(2, 1, NOW() - INTERVAL '30 minutes', 'Spam/promotion excessive');

-- Insertion d''un bannissement (exemple)
INSERT INTO cercle.user_bannissements (user_banni, banni_by, raison, debut_ban, fin_ban) VALUES 
(5, 7, 'Violation des règles de la communauté - contenu inapproprié répété', NOW() - INTERVAL '1 day', NOW() + INTERVAL '6 days');
