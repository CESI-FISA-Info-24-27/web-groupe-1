-- ************************* Données de base pour CERCLE *************************
-- ****************** Inserts nécessaires au fonctionnement ******************



INSERT INTO cercle.roles (role) VALUES 
('user'),           -- id_role = 1 - Utilisateur standard
('moderator'),      -- id_role = 2 - Modérateur
('administrator');  -- id_role = 3 - Administrateur


INSERT INTO cercle.langues (langue) VALUES 
('fr'),        -- id_langue = 1 - Français
('en'),        -- id_langue = 2 - Anglais
('es'),        -- id_langue = 3 - Espagnol
('de'),        -- id_langue = 4 - Allemand
('it');        -- id_langue = 5 - Italien


INSERT INTO cercle.themes (theme) VALUES 
('light'),     -- id_theme = 1 - Thème clair
('dark');      -- id_theme = 2 - Thème sombre


INSERT INTO cercle.message_type (message_type) VALUES 
('post'),          -- id_message_type = 1 - Publication principale
('reply'),         -- id_message_type = 2 - Réponse à un commentaire/post
('repost');        -- id_message_type = 3 - Partage/Repost


INSERT INTO cercle.type_media (media) VALUES 
('image'),         -- id_media = 1 - Image
('video');         -- id_media = 2 - Vidéo
