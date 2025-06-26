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
INSERT INTO cercle.users (nom, prenom, username, mail, password_hash, telephone, bio, id_role, "private", certified, is_active, created_at, updated_at, email_verified, verification_code, verification_code_expires_at, verification_attempts) VALUES 
('Dupont', 'Jean', 'jean_dupont', 'jean.dupont@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456789', 'Passionné de technologie et de voyage', 1, false, false, true, NOW() - INTERVAL '6 months', NOW(), true, NULL, NULL, 0),
('Martin', 'Sophie', 'sophie_martin', 'sophie.martin@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567890', 'Artiste et créatrice de contenu', 1, false, true, true, NOW() - INTERVAL '5 months', NOW(), true, NULL, NULL, 0),
('Leroy', 'Thomas', 'thomas_leroy', 'thomas.leroy@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678901', 'Chef cuisinier, amateur de bonne bouffe', 1, false, false, true, NOW() - INTERVAL '4 months', NOW(), true, NULL, NULL, 0),
('Moreau', 'Emma', 'emma_moreau', 'emma.moreau@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0456789012', 'Sportive et aventurière', 1, true, false, true, NOW() - INTERVAL '3 months', NOW(), true, NULL, NULL, 0),
('Bernard', 'Lucas', 'lucas_bernard', 'lucas.bernard@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0567890123', 'Développeur passionné de gaming', 1, false, false, true, NOW() - INTERVAL '2 months', NOW(), true, NULL, NULL, 0),
('Dubois', 'Camille', 'camille_dubois', 'camille.dubois@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901234', 'Photographe et amatrice de nature', 1, false, true, true, NOW() - INTERVAL '1 month', NOW(), true, NULL, NULL, 0),
('Robert', 'Pierre', 'pierre_robert', 'pierre.robert@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012345', 'Modérateur de la communauté', 2, false, true, true, NOW() - INTERVAL '8 months', NOW(), true, NULL, NULL, 0),
('Petit', 'Marie', 'marie_petit', 'marie.petit@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123456', 'Passionnée de littérature et cinema', 1, false, false, true, NOW() - INTERVAL '7 months', NOW(), true, NULL, NULL, 0),
('Durand', 'Antoine', 'antoine_durand', 'antoine.durand@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234567', 'Musicien et compositeur', 1, true, false, true, NOW() - INTERVAL '9 months', NOW(), true, NULL, NULL, 0),
('Roux', 'Julie', 'julie_roux', 'julie.roux@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456780', 'Administratrice', 3, false, true, true, NOW() - INTERVAL '12 months', NOW(), true, NULL, NULL, 0),
('Garnier', 'Maxime', 'maxime_garnier', 'maxime.garnier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567891', 'Fan de science et innovation', 1, false, false, true, NOW() - INTERVAL '10 days', NOW(), true, NULL, NULL, 0),
('Faure', 'Léa', 'lea_faure', 'lea.faure@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678902', 'Influenceuse mode et lifestyle', 1, false, true, true, NOW() - INTERVAL '15 days', NOW(), true, NULL, NULL, 0),
('Blanc', 'Nicolas', 'nicolas_blanc', 'nicolas.blanc@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0456789013', 'Passionné de cinéma et critique amateur', 1, false, false, true, NOW() - INTERVAL '11 months', NOW(), true, NULL, NULL, 0),
('Vincent', 'Laura', 'laura_vincent', 'laura.vincent@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0567890124', 'Coach fitness et nutritionniste', 1, false, true, true, NOW() - INTERVAL '20 days', NOW(), true, NULL, NULL, 0),
('Lefebvre', 'Hugo', 'hugo_lefebvre', 'hugo.lefebvre@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901235', 'Étudiant en informatique, amateur de jeux vidéo', 1, true, false, true, NOW() - INTERVAL '18 days', NOW(), true, NULL, NULL, 0),
('Girard', 'Chloé', 'chloe_girard', 'chloe.girard@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012346', 'Voyageuse et blogueuse lifestyle', 1, false, true, true, NOW() - INTERVAL '25 days', NOW(), true, NULL, NULL, 0),
('Morel', 'Julien', 'julien_morel', 'julien.morel@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123457', 'Développeur web et entrepreneur', 1, false, false, true, NOW() - INTERVAL '30 days', NOW(), true, NULL, NULL, 0),
('Fournier', 'Manon', 'manon_fournier', 'manon.fournier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234568', 'Artiste peintre et illustratrice', 1, false, true, true, NOW() - INTERVAL '35 days', NOW(), true, NULL, NULL, 0),
('André', 'Kevin', 'kevin_andre', 'kevin.andre@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456781', 'Musicien rock et professeur de guitare', 1, true, false, true, NOW() - INTERVAL '40 days', NOW(), true, NULL, NULL, 0),
('Mercier', 'Océane', 'oceane_mercier', 'oceane.mercier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567892', 'Biologiste marine et écologiste', 1, false, false, true, NOW() - INTERVAL '45 days', NOW(), true, NULL, NULL, 0),
('Lambert', 'Rémi', 'remi_lambert', 'remi.lambert@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678903', 'Journaliste politique et analyste', 1, false, false, true, NOW() - INTERVAL '50 days', NOW(), true, NULL, NULL, 0),
('Bonnet', 'Pauline', 'pauline_bonnet', 'pauline.bonnet@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0456789014', 'Modératrice communauté', 2, false, true, true, NOW() - INTERVAL '55 days', NOW(), true, NULL, NULL, 0),
('François', 'Alexandre', 'alexandre_francois', 'alexandre.francois@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0567890125', 'Photographe professionnel', 1, false, true, true, NOW() - INTERVAL '60 days', NOW(), true, NULL, NULL, 0),
('Rousseau', 'Inès', 'ines_rousseau', 'ines.rousseau@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901236', 'Étudiante en médecine et bénévole', 1, true, false, true, NOW() - INTERVAL '65 days', NOW(), true, NULL, NULL, 0),
('Simon', 'Mathis', 'mathis_simon', 'mathis.simon@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012347', 'Designer graphique et créateur de contenu', 1, false, false, true, NOW() - INTERVAL '70 days', NOW(), true, NULL, NULL, 0),
('Michel', 'Anaïs', 'anais_michel', 'anais.michel@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123458', 'Chef pâtissière et youtubeuse culinaire', 1, false, true, true, NOW() - INTERVAL '75 days', NOW(), true, NULL, NULL, 0),
('Garcia', 'Dylan', 'dylan_garcia', 'dylan.garcia@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234569', 'Streamer gaming et influenceur', 1, false, true, true, NOW() - INTERVAL '80 days', NOW(), true, NULL, NULL, 0),
('David', 'Clémence', 'clemence_david', 'clemence.david@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456782', 'Architecte et urbaniste', 1, false, false, true, NOW() - INTERVAL '85 days', NOW(), true, NULL, NULL, 0),
('Bertrand', 'Florian', 'florian_bertrand', 'florian.bertrand@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567893', 'Ingénieur aérospatial passionné d''astronomie', 1, true, false, true, NOW() - INTERVAL '90 days', NOW(), true, NULL, NULL, 0),
('Chevalier', 'Elsa', 'elsa_chevalier', 'elsa.chevalier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678904', 'Professeure de yoga et coach bien-être', 1, false, true, true, NOW() - INTERVAL '95 days', NOW(), true, NULL, NULL, 0),
('Colin', 'Bastien', 'bastien_colin', 'bastien.colin@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0456789015', 'Barista et amateur de café', 1, false, false, true, NOW() - INTERVAL '100 days', NOW(), true, NULL, NULL, 0),
('Roy', 'Margot', 'margot_roy', 'margot.roy@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0567890126', 'Vétérinaire et protectrice des animaux', 1, false, false, true, NOW() - INTERVAL '105 days', NOW(), true, NULL, NULL, 0),
('Meunier', 'Axel', 'axel_meunier', 'axel.meunier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901237', 'Mécanicien auto et passionné de moto', 1, true, false, true, NOW() - INTERVAL '110 days', NOW(), true, NULL, NULL, 0),
('Barbier', 'Lola', 'lola_barbier', 'lola.barbier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012348', 'Danseuse professionnelle et chorégraphe', 1, false, true, true, NOW() - INTERVAL '115 days', NOW(), true, NULL, NULL, 0),
('Lemoine', 'Quentin', 'quentin_lemoine', 'quentin.lemoine@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123459', 'Économiste et consultant financier', 1, false, false, true, NOW() - INTERVAL '120 days', NOW(), true, NULL, NULL, 0),
('Duval', 'Jade', 'jade_duval', 'jade.duval@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234570', 'Étudiante en arts du spectacle', 1, true, false, true, NOW() - INTERVAL '125 days', NOW(), true, NULL, NULL, 0),
('Moreau', 'Théo', 'theo_moreau', 'theo.moreau@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456783', 'Professeur de mathématiques et vulgarisateur', 1, false, false, true, NOW() - INTERVAL '130 days', NOW(), true, NULL, NULL, 0),
('Giraud', 'Luna', 'luna_giraud', 'luna.giraud@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567894', 'Psychologue et thérapeute', 1, false, true, true, NOW() - INTERVAL '135 days', NOW(), true, NULL, NULL, 0),
('Roche', 'Noah', 'noah_roche', 'noah.roche@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678905', 'Étudiant en droit et militant associatif', 1, false, false, true, NOW() - INTERVAL '140 days', NOW(), true, NULL, NULL, 0),
('Leclerc', 'Zoé', 'zoe_leclerc', 'zoe.leclerc@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0456789016', 'Libraire et amatrice de littérature', 1, false, false, true, NOW() - INTERVAL '145 days', NOW(), true, NULL, NULL, 0),
('Lecomte', 'Enzo', 'enzo_lecomte', 'enzo.lecomte@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0567890127', 'Électricien et bricoleur passionné', 1, true, false, true, NOW() - INTERVAL '150 days', NOW(), true, NULL, NULL, 0),
('Laurent', 'Sarah', 'sarah_laurent', 'sarah.laurent@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901238', 'Infirmière et bénévole humanitaire', 1, false, true, true, NOW() - INTERVAL '155 days', NOW(), true, NULL, NULL, 0),
('Perrin', 'Gabriel', 'gabriel_perrin', 'gabriel.perrin@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012349', 'Pharmacien et chercheur', 1, false, false, true, NOW() - INTERVAL '160 days', NOW(), true, NULL, NULL, 0),
('Morin', 'Lina', 'lina_morin', 'lina.morin@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123460', 'Traductrice et polyglotte', 1, false, false, true, NOW() - INTERVAL '165 days', NOW(), true, NULL, NULL, 0),
('Richard', 'Evan', 'evan_richard', 'evan.richard@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234571', 'Comptable et passionné de finance', 1, true, false, true, NOW() - INTERVAL '170 days', NOW(), true, NULL, NULL, 0),
('Nicolas', 'Mila', 'mila_nicolas', 'mila.nicolas@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456784', 'Styliste et consultante mode', 1, false, true, true, NOW() - INTERVAL '175 days', NOW(), true, NULL, NULL, 0),
('Guerin', 'Nolan', 'nolan_guerin', 'nolan.guerin@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567895', 'Pompier volontaire et secouriste', 1, false, false, true, NOW() - INTERVAL '180 days', NOW(), true, NULL, NULL, 0),
('Schneider', 'Romane', 'romane_schneider', 'romane.schneider@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678906', 'Journaliste culture et critique littéraire', 1, false, true, true, NOW() - INTERVAL '185 days', NOW(), true, NULL, NULL, 0),
('Muller', 'Timéo', 'timeo_muller', 'timeo.muller@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0456789017', 'Étudiant en informatique et développeur', 1, true, false, true, NOW() - INTERVAL '190 days', NOW(), true, NULL, NULL, 0),
('Henry', 'Alba', 'alba_henry', 'alba.henry@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0567890128', 'Artiste street art et graffeuse', 1, false, true, true, NOW() - INTERVAL '195 days', NOW(), true, NULL, NULL, 0),
('Roussel', 'Léo', 'leo_roussel', 'leo.roussel@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901239', 'Kinésithérapeute et coach sportif', 1, false, false, true, NOW() - INTERVAL '200 days', NOW(), true, NULL, NULL, 0),
('Moreau', 'Capucine', 'capucine_moreau', 'capucine.moreau@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012350', 'Fleuriste et amatrice de jardinage', 1, false, false, true, NOW() - INTERVAL '205 days', NOW(), true, NULL, NULL, 0),
('Garnier', 'Sacha', 'sacha_garnier', 'sacha.garnier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123461', 'Réalisateur amateur et cinéphile', 1, true, false, true, NOW() - INTERVAL '210 days', NOW(), true, NULL, NULL, 0),
('Dupuis', 'Maëlle', 'maelle_dupuis', 'maelle.dupuis@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234572', 'Nutritionniste et blogueuse santé', 1, false, true, true, NOW() - INTERVAL '215 days', NOW(), true, NULL, NULL, 0),
('Meyer', 'Mattéo', 'matteo_meyer', 'matteo.meyer@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456785', 'Barman et mixologue', 1, false, false, true, NOW() - INTERVAL '220 days', NOW(), true, NULL, NULL, 0),
('Leroy', 'Victoire', 'victoire_leroy', 'victoire.leroy@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567896', 'Avocate et militante droits humains', 1, false, true, true, NOW() - INTERVAL '225 days', NOW(), true, NULL, NULL, 0),
('Durand', 'Ryan', 'ryan_durand', 'ryan.durand@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678907', 'Plombier et artisan', 1, true, false, true, NOW() - INTERVAL '230 days', NOW(), true, NULL, NULL, 0),
('Lefebvre', 'Lise', 'lise_lefebvre', 'lise.lefebvre@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0456789018', 'Sommelier et experte en vin', 1, false, false, true, NOW() - INTERVAL '235 days', NOW(), true, NULL, NULL, 0),
('Fontaine', 'Kylian', 'kylian_fontaine', 'kylian.fontaine@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0567890129', 'Footballeur semi-professionnel', 1, false, true, true, NOW() - INTERVAL '240 days', NOW(), true, NULL, NULL, 0),
('Riviere', 'Agathe', 'agathe_riviere', 'agathe.riviere@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901240', 'Archéologue et historienne', 1, false, false, true, NOW() - INTERVAL '245 days', NOW(), true, NULL, NULL, 0),
('Lucas', 'Valentin', 'valentin_lucas', 'valentin.lucas@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012351', 'Chef de cuisine et gastronome', 1, false, true, true, NOW() - INTERVAL '250 days', NOW(), true, NULL, NULL, 0),
('Prevost', 'Iris', 'iris_prevost', 'iris.prevost@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123462', 'Optométriste et passionnée de science', 1, true, false, true, NOW() - INTERVAL '255 days', NOW(), true, NULL, NULL, 0),
('Robin', 'Léon', 'leon_robin', 'leon.robin@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234573', 'Musicien classique et professeur de piano', 1, false, false, true, NOW() - INTERVAL '260 days', NOW(), true, NULL, NULL, 0),
('Gautier', 'Apolline', 'apolline_gautier', 'apolline.gautier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456786', 'Créatrice de bijoux et artiste', 1, false, true, true, NOW() - INTERVAL '265 days', NOW(), true, NULL, NULL, 0),
('Lopez', 'Maël', 'mael_lopez', 'mael.lopez@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567897', 'Surfeur professionnel et influenceur sport', 1, false, true, true, NOW() - INTERVAL '270 days', NOW(), true, NULL, NULL, 0),
('Gonzalez', 'Héloïse', 'heloise_gonzalez', 'heloise.gonzalez@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678908', 'Professeure d''espagnol et guide touristique', 1, false, false, true, NOW() - INTERVAL '275 days', NOW(), true, NULL, NULL, 0),
('Martin', 'Adam', 'adam_martin', 'adam.martin@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0456789019', 'Développeur mobile et tech lead', 1, true, false, true, NOW() - INTERVAL '280 days', NOW(), true, NULL, NULL, 0),
('Bernard', 'Éléa', 'elea_bernard', 'elea.bernard@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0567890130', 'Sage-femme et militante féministe', 1, false, true, true, NOW() - INTERVAL '285 days', NOW(), true, NULL, NULL, 0),
('Thomas', 'Lorenzo', 'lorenzo_thomas', 'lorenzo.thomas@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901241', 'Cycliste professionnel et entraîneur', 1, false, false, true, NOW() - INTERVAL '290 days', NOW(), true, NULL, NULL, 0),
('Petit', 'Diane', 'diane_petit', 'diane.petit@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012352', 'Dermatologue et influenceuse beauté', 1, false, true, true, NOW() - INTERVAL '295 days', NOW(), true, NULL, NULL, 0),
('Robert', 'Nathan', 'nathan_robert', 'nathan.robert@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123463', 'Étudiant en commerce et entrepreneur', 1, true, false, true, NOW() - INTERVAL '300 days', NOW(), true, NULL, NULL, 0),
('Richard', 'Amélie', 'amelie_richard', 'amelie.richard@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234574', 'Modératrice communauté senior', 2, false, true, true, NOW() - INTERVAL '305 days', NOW(), true, NULL, NULL, 0),
('Durand', 'Ethan', 'ethan_durand', 'ethan.durand@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456787', 'Chauffeur routier et voyageur', 1, false, false, true, NOW() - INTERVAL '310 days', NOW(), true, NULL, NULL, 0),
('Moreau', 'Lana', 'lana_moreau', 'lana.moreau@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567898', 'Chanteuse et compositrice', 1, false, true, true, NOW() - INTERVAL '315 days', NOW(), true, NULL, NULL, 0),
('Laurent', 'Pablo', 'pablo_laurent', 'pablo.laurent@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678909', 'Sculpteur et artiste plasticien', 1, true, false, true, NOW() - INTERVAL '320 days', NOW(), true, NULL, NULL, 0),
('Simon', 'Emma-Lou', 'emma_lou_simon', 'emma.lou.simon@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0456789020', 'Éducatrice spécialisée et bénévole', 1, false, false, true, NOW() - INTERVAL '325 days', NOW(), true, NULL, NULL, 0),
('Michel', 'Gabin', 'gabin_michel', 'gabin.michel@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0567890131', 'Ébéniste et artisan du bois', 1, false, false, true, NOW() - INTERVAL '330 days', NOW(), true, NULL, NULL, 0),
('Garcia', 'Céleste', 'celeste_garcia', 'celeste.garcia@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901242', 'Astrologue et coach spirituelle', 1, false, true, true, NOW() - INTERVAL '335 days', NOW(), true, NULL, NULL, 0),
('David', 'Loïc', 'loic_david', 'loic.david@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012353', 'Caméraman et vidéaste', 1, true, false, true, NOW() - INTERVAL '340 days', NOW(), true, NULL, NULL, 0),
('Bertrand', 'Séléna', 'selena_bertrand', 'selena.bertrand@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123464', 'Coiffeuse et consultante beauté', 1, false, true, true, NOW() - INTERVAL '345 days', NOW(), true, NULL, NULL, 0),
('Chevalier', 'Marius', 'marius_chevalier', 'marius.chevalier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234575', 'Géologue et passionné de minéralogie', 1, false, false, true, NOW() - INTERVAL '350 days', NOW(), true, NULL, NULL, 0),
('Colin', 'Maëlys', 'maelys_colin', 'maelys.colin@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456788', 'Radiologue et passionnée de tech médicale', 1, false, false, true, NOW() - INTERVAL '355 days', NOW(), true, NULL, NULL, 0),
('Roy', 'Jules', 'jules_roy', 'jules.roy@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567899', 'Boulanger et créateur de pâtisseries', 1, true, false, true, NOW() - INTERVAL '360 days', NOW(), true, NULL, NULL, 0),
('Meunier', 'Alicia', 'alicia_meunier', 'alicia.meunier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678910', 'Ostéopathe et coach posturale', 1, false, true, true, NOW() - INTERVAL '365 days', NOW(), true, NULL, NULL, 0),
('Martinez', 'Yanis', 'yanis_martinez', 'yanis.martinez@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901243', 'DJ et producteur de musique électronique', 1, false, true, true, NOW() - INTERVAL '12 days', NOW(), true, NULL, NULL, 0),
('Benoit', 'Océane', 'oceane_benoit', 'oceane.benoit@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012354', 'Journaliste sportive et commentatrice', 1, false, false, true, NOW() - INTERVAL '8 days', NOW(), true, NULL, NULL, 0),
('Rousseau', 'Maxence', 'maxence_rousseau', 'maxence.rousseau@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123465', 'Artisan brasseur et sommelier bière', 1, true, false, true, NOW() - INTERVAL '22 days', NOW(), true, NULL, NULL, 0),
('Fabre', 'Léonie', 'leonie_fabre', 'leonie.fabre@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234576', 'Professeure de français et écrivaine', 1, false, true, true, NOW() - INTERVAL '16 days', NOW(), true, NULL, NULL, 0),
('Girard', 'Antonin', 'antonin_girard', 'antonin.girard@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456789', 'Climatologue et militant écologiste', 1, false, false, true, NOW() - INTERVAL '28 days', NOW(), true, NULL, NULL, 0),
('Lemaire', 'Chloé', 'chloe_lemaire', 'chloe.lemaire@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567800', 'Thérapeute énergétique et coach de vie', 1, false, true, true, NOW() - INTERVAL '19 days', NOW(), true, NULL, NULL, 0),
('Morel', 'Baptiste', 'baptiste_morel', 'baptiste.morel@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0345678911', 'Pilote de drone et photographe aérien', 1, true, false, true, NOW() - INTERVAL '35 days', NOW(), true, NULL, NULL, 0),
('Blanc', 'Inès', 'ines_blanc', 'ines.blanc@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0456789021', 'Podologue et passionnée de trail running', 1, false, false, true, NOW() - INTERVAL '14 days', NOW(), true, NULL, NULL, 0),
('Fontaine', 'Raphaël', 'raphael_fontaine', 'raphael.fontaine@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0567890132', 'Tatoueur professionnel et artiste', 1, false, true, true, NOW() - INTERVAL '26 days', NOW(), true, NULL, NULL, 0),
('Perrot', 'Jade', 'jade_perrot', 'jade.perrot@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0678901244', 'Apicultrice et défenseuse de la biodiversité', 1, false, false, true, NOW() - INTERVAL '31 days', NOW(), true, NULL, NULL, 0),
('Dumont', 'Tom', 'tom_dumont', 'tom.dumont@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0789012355', 'Youtubeur tech et testeur de gadgets', 1, false, true, true, NOW() - INTERVAL '6 days', NOW(), true, NULL, NULL, 0),
('Roussel', 'Luna', 'luna_roussel', 'luna.roussel@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0890123466', 'Parfumeuse créatrice et nez', 1, true, true, true, NOW() - INTERVAL '37 days', NOW(), true, NULL, NULL, 0),
('Gauthier', 'Eliott', 'eliott_gauthier', 'eliott.gauthier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0901234577', 'Étudiant en médecine vétérinaire', 1, false, false, true, NOW() - INTERVAL '21 days', NOW(), true, NULL, NULL, 0),
('Legrand', 'Maëva', 'maeva_legrand', 'maeva.legrand@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0123456790', 'Consultante en développement durable', 1, false, true, true, NOW() - INTERVAL '42 days', NOW(), true, NULL, NULL, 0),
('Perrier', 'Alexis', 'alexis_perrier', 'alexis.perrier@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '0234567801', 'Magicien professionnel et mentaliste', 1, true, false, true, NOW() - INTERVAL '9 days', NOW(), true, NULL, NULL, 0),
('Laut', 'Benoit', 'benoit_laut', 'benoit.laut@email.com', '$2b$12$LQv3c1yqBwEHFLK.5cPnm.n5WP8NKqN0gLx4QEOxKpJUY1bFXjV.O', '023458996', 'Avocat', 1, false, true, true, NOW() - INTERVAL '225 days', NOW(), true, NULL, NULL, 0);

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
(12, 1, true, 1),  -- Léa Faure
(13, 1, true, 1),   -- Nicolas Blanc
(14, 1, false, 2),  -- Laura Vincent
(15, 1, true, 2),   -- Hugo Lefebvre
(16, 1, false, 1),  -- Chloé Girard
(17, 1, true, 2),   -- Julien Morel
(18, 1, true, 1),   -- Manon Fournier
(19, 2, false, 2),  -- Kevin André
(20, 1, true, 1),   -- Océane Mercier
(21, 1, false, 2),  -- Rémi Lambert
(22, 1, true, 1),   -- Pauline Bonnet
(23, 1, true, 2),   -- Alexandre François
(24, 1, false, 1),  -- Inès Rousseau
(25, 1, true, 2),   -- Mathis Simon
(26, 1, false, 1),  -- Anaïs Michel
(27, 1, true, 2),   -- Dylan Garcia
(28, 1, true, 1),   -- Clémence David
(29, 2, false, 2),  -- Florian Bertrand
(30, 1, true, 1),   -- Elsa Chevalier
(31, 1, false, 2),  -- Bastien Colin
(32, 1, true, 1),   -- Margot Roy
(33, 1, true, 2),   -- Axel Meunier
(34, 1, false, 1),  -- Lola Barbier
(35, 1, true, 2),   -- Quentin Lemoine
(36, 1, false, 1),  -- Jade Duval
(37, 1, true, 2),   -- Théo Moreau
(38, 1, true, 1),   -- Luna Giraud
(39, 1, false, 2),  -- Noah Roche
(40, 1, true, 1),   -- Zoé Leclerc
(41, 1, false, 2),  -- Enzo Lecomte
(42, 1, true, 1),   -- Sarah Laurent
(43, 1, true, 2),   -- Gabriel Perrin
(44, 2, false, 1),  -- Lina Morin
(45, 1, true, 2),   -- Evan Richard
(46, 1, false, 1),  -- Mila Nicolas
(47, 1, true, 2),   -- Nolan Guerin
(48, 1, true, 1),   -- Romane Schneider
(49, 1, false, 2),  -- Timéo Muller
(50, 1, true, 1),   -- Alba Henry
(51, 1, false, 2),  -- Léo Roussel
(52, 1, true, 1),   -- Capucine Moreau
(53, 1, true, 2),   -- Sacha Garnier
(54, 1, false, 1),  -- Maëlle Dupuis
(55, 1, true, 2),   -- Mattéo Meyer
(56, 1, true, 1),   -- Victoire Leroy
(57, 1, false, 2),  -- Ryan Durand
(58, 1, true, 1),   -- Lise Lefebvre
(59, 1, false, 2),  -- Kylian Fontaine
(60, 1, true, 1),   -- Agathe Riviere
(61, 1, true, 2),   -- Valentin Lucas
(62, 1, false, 1),  -- Iris Prevost
(63, 2, true, 2),   -- Léon Robin
(64, 1, false, 1),  -- Apolline Gautier
(65, 1, true, 2),   -- Maël Lopez
(66, 2, true, 1),   -- Héloïse Gonzalez
(67, 1, false, 2),  -- Adam Martin
(68, 1, true, 1),   -- Éléa Bernard
(69, 1, false, 2),  -- Lorenzo Thomas
(70, 1, true, 1),   -- Diane Petit
(71, 1, true, 2),   -- Nathan Robert
(72, 1, false, 1),  -- Amélie Richard
(73, 1, true, 2),   -- Ethan Durand
(74, 1, false, 1),  -- Lana Moreau
(75, 1, true, 2),   -- Pablo Laurent
(76, 1, true, 1),   -- Emma-Lou Simon
(77, 1, false, 2),  -- Gabin Michel
(78, 1, true, 1),   -- Céleste Garcia
(79, 1, false, 2),  -- Loïc David
(80, 1, true, 1),   -- Séléna Bertrand
(81, 1, true, 2),   -- Marius Chevalier
(82, 1, false, 1),  -- Maëlys Colin
(83, 1, true, 2),   -- Jules Roy
(84, 1, false, 1),  -- Alicia Meunier
(85, 1, true, 2),   -- Les utilisateurs 85-100 avec des préférences variées
(86, 1, false, 1),
(87, 2, true, 2),
(88, 1, true, 1),
(89, 1, false, 2),
(90, 1, true, 1),
(91, 1, false, 2),
(92, 1, true, 1),
(93, 1, true, 2),
(94, 2, false, 1),
(95, 1, true, 2),
(96, 1, false, 1),
(97, 1, true, 2),
(98, 1, true, 1),
(99, 1, false, 2),
(100, 1, true, 1);

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
(12, 2, false, true, true, NOW() - INTERVAL '1 day', NOW()),
(1, 13, false, true, true, NOW() - INTERVAL '15 days', NOW()),
(1, 23, false, true, false, NOW() - INTERVAL '12 days', NOW()),
(2, 14, false, true, true, NOW() - INTERVAL '18 days', NOW()),
(2, 18, false, true, false, NOW() - INTERVAL '20 days', NOW()),
(3, 26, false, true, true, NOW() - INTERVAL '8 days', NOW()),
(3, 48, false, true, false, NOW() - INTERVAL '10 days', NOW()),
(4, 14, false, true, true, NOW() - INTERVAL '25 days', NOW()),
(4, 51, false, true, false, NOW() - INTERVAL '30 days', NOW()),
(5, 15, false, true, true, NOW() - INTERVAL '5 days', NOW()),
(5, 27, false, true, false, NOW() - INTERVAL '7 days', NOW()),
(13, 1, false, true, true, NOW() - INTERVAL '14 days', NOW()),
(13, 2, false, true, false, NOW() - INTERVAL '16 days', NOW()),
(14, 4, false, true, true, NOW() - INTERVAL '24 days', NOW()),
(14, 30, false, true, false, NOW() - INTERVAL '22 days', NOW()),
(15, 5, false, true, true, NOW() - INTERVAL '4 days', NOW()),
(15, 25, false, true, true, NOW() - INTERVAL '6 days', NOW()),
(16, 2, false, true, false, NOW() - INTERVAL '19 days', NOW()),
(16, 58, false, true, true, NOW() - INTERVAL '17 days', NOW()),
(17, 5, false, true, true, NOW() - INTERVAL '8 days', NOW()),
(17, 67, false, true, false, NOW() - INTERVAL '11 days', NOW()),
(18, 2, false, true, true, NOW() - INTERVAL '21 days', NOW()),
(18, 50, false, true, false, NOW() - INTERVAL '23 days', NOW()),
(19, 9, false, true, true, NOW() - INTERVAL '35 days', NOW()),
(19, 63, false, true, false, NOW() - INTERVAL '32 days', NOW()),
(20, 4, false, true, true, NOW() - INTERVAL '40 days', NOW()),
(20, 32, false, true, false, NOW() - INTERVAL '38 days', NOW()),
(25, 15, false, true, true, NOW() - INTERVAL '3 days', NOW()),
(25, 49, false, true, false, NOW() - INTERVAL '5 days', NOW()),
(27, 15, false, true, true, NOW() - INTERVAL '6 days', NOW()),
(27, 25, false, true, false, NOW() - INTERVAL '4 days', NOW()),
(30, 18, false, true, true, NOW() - INTERVAL '20 days', NOW()),
(30, 42, false, true, false, NOW() - INTERVAL '18 days', NOW()),
(34, 22, false, true, true, NOW() - INTERVAL '45 days', NOW()),
(34, 68, false, true, false, NOW() - INTERVAL '42 days', NOW()),
(38, 26, false, true, true, NOW() - INTERVAL '28 days', NOW()),
(38, 43, false, true, false, NOW() - INTERVAL '25 days', NOW()),
(42, 30, false, true, true, NOW() - INTERVAL '15 days', NOW()),
(42, 68, false, true, false, NOW() - INTERVAL '12 days', NOW()),
(50, 18, false, true, true, NOW() - INTERVAL '30 days', NOW()),
(50, 64, false, true, false, NOW() - INTERVAL '28 days', NOW()),
(58, 3, false, true, true, NOW() - INTERVAL '35 days', NOW()),
(58, 61, false, true, false, NOW() - INTERVAL '33 days', NOW()),
(63, 9, false, true, true, NOW() - INTERVAL '40 days', NOW()),
(63, 74, false, true, false, NOW() - INTERVAL '38 days', NOW()),
(68, 42, false, true, true, NOW() - INTERVAL '10 days', NOW()),
(68, 84, false, true, false, NOW() - INTERVAL '8 days', NOW()),
(74, 63, false, true, true, NOW() - INTERVAL '25 days', NOW()),
(74, 19, false, true, false, NOW() - INTERVAL '23 days', NOW()),
(45, 35, true, false, false, NOW() - INTERVAL '2 days', NOW()),
(52, 60, true, false, false, NOW() - INTERVAL '1 day', NOW()),
(67, 49, true, false, false, NOW() - INTERVAL '3 days', NOW()),
(78, 65, true, false, false, NOW() - INTERVAL '1 day', NOW());

-- Insertion de posts
INSERT INTO cercle.post (id_user, post_parent, content, id_message_type, active, created_at, updated_at) VALUES 
(1, NULL, 'Bonjour tout le monde ! Premier post sur cette plateforme 🚀 #technologie', 1, true, NOW() - INTERVAL '5 days', NOW()),
(2, NULL, 'Nouvelle œuvre terminée ! Qu''en pensez-vous ? #art #creation', 1, true, NOW() - INTERVAL '4 days', NOW()),
(3, NULL, 'Recette du jour : risotto aux champignons ! Un délice 🍄 #cuisine #recette', 1, true, NOW() - INTERVAL '3 days', NOW()),
(4, NULL, 'Trail matinal de 15km ! Rien de mieux pour commencer la journée 🏃‍♀️ #sport #running', 1, true, NOW() - INTERVAL '2 days', NOW()),
(5, NULL, 'Nouveau jeu indie découvert, c''est un chef-d''œuvre ! #gaming #indie', 1, true, NOW() - INTERVAL '1 day', NOW()),
(1, NULL, 'Bonjour tout le monde !', 1, true, NOW() - INTERVAL '5 days', NOW()),
(2, NULL, 'Bonjour tout le monde !', 1, true, NOW() - INTERVAL '4 days', NOW()),
(3, NULL, 'Bonjour tout le monde !', 1, true, NOW() - INTERVAL '3 days', NOW()),
(4, NULL, 'Bonjour tout le monde !', 1, true, NOW() - INTERVAL '2 days', NOW()),
(5, NULL, 'Bonjour tout le monde !', 1, true, NOW() - INTERVAL '1 day', NOW()),
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
(6, 9, 'Hâte d''entendre le résultat ! J''adore le jazz fusion', 2, true, NOW() - INTERVAL '2 hours 30 minutes', NOW()),
(13, NULL, 'Soirée cinéma ! Vient de regarder le dernier Scorsese, un chef-d''œuvre absolu 🎬 #cinema #critique', 1, true, NOW() - INTERVAL '8 hours', NOW()),
(14, NULL, 'Séance HIIT de ce matin terminée ! 45 minutes de pur cardio 💪 Qui se joint à moi demain ? #fitness #motivation', 1, true, NOW() - INTERVAL '10 hours', NOW()),
(15, NULL, 'Nuit blanche sur mon projet de fin d''études... Les joies du code ! ☕️💻 #informatique #etudiant', 1, true, NOW() - INTERVAL '4 hours', NOW()),
(16, NULL, 'Retour de mon voyage au Japon ! Photos à venir, culture fascinante 🏯 #voyage #japon', 1, true, NOW() - INTERVAL '2 days', NOW()),
(17, NULL, 'Lancement de ma startup la semaine prochaine ! 2 ans de travail aboutissent enfin 🚀 #entrepreneuriat #startup', 1, true, NOW() - INTERVAL '1 day', NOW()),
(18, NULL, 'Nouvelle toile terminée ! Inspiration street art et classique mélangés 🎨 #art #peinture', 1, true, NOW() - INTERVAL '6 hours', NOW()),
(19, NULL, 'Répétition avec le groupe ce soir ! Notre nouveau single sort bientôt 🎸 #musique #rock', 1, true, NOW() - INTERVAL '5 hours', NOW()),
(20, NULL, 'Plongée incroyable aujourd''hui ! Les coraux se portent mieux que prévu 🐠 #biologie #ocean', 1, true, NOW() - INTERVAL '12 hours', NOW()),
(21, NULL, 'Analyse des derniers sondages : tendances politiques surprenantes ! 📊 #politique #analyse', 1, true, NOW() - INTERVAL '3 days', NOW()),
(22, NULL, 'Merci à tous pour vos signalements constructifs ! La communauté s''améliore chaque jour 👥 #moderation #communaute', 1, true, NOW() - INTERVAL '1 day', NOW()),
(23, NULL, 'Golden hour magique ce matin ! La lumière était parfaite 📸 #photographie #goldenhour', 1, true, NOW() - INTERVAL '14 hours', NOW()),
(24, NULL, 'Stage aux urgences intense mais enrichissant ! Chaque jour j''apprends 🏥 #medecine #stage', 1, true, NOW() - INTERVAL '18 hours', NOW()),
(25, NULL, 'Nouveau logo terminé pour un client ! Fier du résultat final ✨ #design #graphisme', 1, true, NOW() - INTERVAL '7 hours', NOW()),
(26, NULL, 'Recette de macarons ratée... 4ème tentative ! La pâtisserie c''est un art 🧁 #patisserie #echec', 1, true, NOW() - INTERVAL '9 hours', NOW()),
(27, NULL, 'Stream de 8h hier ! Merci à tous ceux qui ont regardé la découverte de ce nouveau RPG 🎮 #gaming #stream', 1, true, NOW() - INTERVAL '16 hours', NOW()),
(28, NULL, 'Projet d''urbanisme validé ! Fier de contribuer à l''aménagement de ma ville 🏢 #architecture #urbanisme', 1, true, NOW() - INTERVAL '2 days', NOW()),
(29, NULL, 'Observation de Mars au télescope hier soir ! La planète rouge n''a jamais été aussi claire 🔭 #astronomie #mars', 1, true, NOW() - INTERVAL '20 hours', NOW()),
(30, NULL, 'Cours de yoga dans le parc ce matin ! Rien de mieux pour commencer la journée 🧘‍♀️ #yoga #bienetre', 1, true, NOW() - INTERVAL '11 hours', NOW()),
(1, 13, 'Quel film de Scorsese ? J''adore ses œuvres ! 🎬', 2, true, NOW() - INTERVAL '7 hours 30 minutes', NOW()),
(14, 1, 'Avec plaisir Jean ! J''organise des séances groupe régulièrement', 2, true, NOW() - INTERVAL '9 hours 30 minutes', NOW()),
(5, 15, 'Courage Hugo ! Le code de nuit c''est parfois plus productif 😅', 2, true, NOW() - INTERVAL '3 hours 45 minutes', NOW()),
(2, 16, 'Le Japon ! Un de mes rêves de voyage. Hâte de voir tes photos !', 2, true, NOW() - INTERVAL '1 day 18 hours', NOW()),
(25, 17, 'Bravo Julien ! Le monde de l''entrepreneuriat t''attend 🚀', 2, true, NOW() - INTERVAL '22 hours', NOW()),
(6, 23, 'Magnifique ! Tu captures toujours la lumière parfaitement', 2, true, NOW() - INTERVAL '13 hours 30 minutes', NOW()),
(3, 26, 'Les macarons c''est technique ! Courage, la 5ème sera la bonne 😊', 2, true, NOW() - INTERVAL '8 hours 45 minutes', NOW()),
(11, 29, 'Incroyable ! J''aimerais beaucoup observer Mars aussi', 2, true, NOW() - INTERVAL '19 hours 15 minutes', NOW()),
(31, NULL, 'Café du jour : un Ethiopia single origin exceptionnel ☕️ Notes florales incroyables #cafe #barista', 1, true, NOW() - INTERVAL '15 hours', NOW()),
(34, NULL, 'Répétition générale demain ! Notre spectacle de danse contemporaine approche 💃 #danse #spectacle', 1, true, NOW() - INTERVAL '1 day 12 hours', NOW()),
(38, NULL, 'Séance thérapie de groupe très enrichissante aujourd''hui 🧠 L''écoute est un art #psychologie #therapie', 1, true, NOW() - INTERVAL '8 hours', NOW()),
(42, NULL, 'Mission humanitaire en préparation ! Direction l''Afrique le mois prochain ✈️ #humanitaire #mission', 1, true, NOW() - INTERVAL '2 days', NOW()),
(48, NULL, 'Critique du dernier Goncourt dans mon article de demain ! Littérature contemporaine passionnante 📚 #litterature #critique', 1, true, NOW() - INTERVAL '6 hours', NOW()),
(54, NULL, 'Recette détox post-fêtes ! Smoothie vert énergisant pour bien commencer l''année 🥬 #nutrition #detox', 1, true, NOW() - INTERVAL '13 hours', NOW()),
(61, NULL, 'Menu gastronomique de ce soir : risotto aux truffes et saint-jacques 🍽️ #gastronomie #chef', 1, true, NOW() - INTERVAL '4 hours', NOW()),
(65, NULL, 'Session surf incroyable ce matin ! Vagues parfaites, conditions idéales 🏄‍♂️ #surf #ocean', 1, true, NOW() - INTERVAL '10 hours', NOW()),
(70, NULL, 'Nouveau traitement anti-âge révolutionnaire ! La dermatologie évolue rapidement 💉 #dermatologie #innovation', 1, true, NOW() - INTERVAL '17 hours', NOW()),
(74, NULL, 'Nouvel album en préparation ! Inspiration folk et électro cette fois 🎵 #musique #album', 1, true, NOW() - INTERVAL '1 day 8 hours', NOW()),

-- Discussion 1: Fil sur l'art de Sophie (post 2)
-- Jean a répondu (post 11), Sophie peut répondre à Jean
(2, 11, 'Merci Jean ! 😊 Ça me motive vraiment. Tu pratiques un art aussi ?', 2, true, NOW() - INTERVAL '3 days 10 hours', NOW()),
-- Jean répond à Sophie
(1, 65, 'Pas du tout artistique malheureusement ! Mais j''admire beaucoup. Tu exposes où ?', 2, true, NOW() - INTERVAL '3 days 8 hours', NOW()),
-- Camille (photographe) s'invite dans la discussion
(6, 66, 'Sophie, tes œuvres seraient parfaites pour une expo photo-peinture ! 📸🎨', 2, true, NOW() - INTERVAL '3 days 6 hours', NOW()),
-- Sophie répond à Camille
(2, 67, 'Excellente idée Camille ! On devrait vraiment collaborer ✨', 2, true, NOW() - INTERVAL '3 days 4 hours', NOW()),

-- Discussion 2: Fil sur le sport d'Emma (post 4)
-- Thomas a répondu (post 12), Emma peut développer
(4, 12, 'C''est parti Thomas ! 💪 Tu préfères quelle distance pour commencer ?', 2, true, NOW() - INTERVAL '1 day 16 hours', NOW()),
-- Thomas répond avec plus de détails
(3, 68, 'Je pensais à 5km d''abord ! Faut que je reprenne progressivement 😅', 2, true, NOW() - INTERVAL '1 day 14 hours', NOW()),
-- Laura (coach fitness) rejoint la conversation
(14, 69, 'Bonne approche Thomas ! Progression graduelle = moins de blessures 🏃‍♂️', 2, true, NOW() - INTERVAL '1 day 12 hours', NOW()),
-- Emma répond à Laura
(4, 70, 'Exactement Laura ! On pourrait organiser un groupe débutants ?', 2, true, NOW() - INTERVAL '1 day 10 hours', NOW()),
-- Thomas montre son enthousiasme
(3, 71, 'Je suis partant ! Quand est-ce qu''on commence ? 🔥', 2, true, NOW() - INTERVAL '1 day 8 hours', NOW()),

-- Discussion 3: Fil sur la cuisine de Thomas (post 3)
-- Sophie a demandé la recette (post 13), Thomas répond
(3, 13, 'Bien sûr Sophie ! 🍄 Champignons de Paris, riz arborio, parmesan... Je t''envoie tout !', 2, true, NOW() - INTERVAL '2 days 18 hours', NOW()),
-- Anaïs (chef pâtissière) s'intéresse
(26, 72, 'Thomas, tu utilises quel type de bouillon ? Le secret c''est là ! 👨‍🍳', 2, true, NOW() - INTERVAL '2 days 16 hours', NOW()),
-- Thomas répond à Anaïs
(3, 73, 'Bouillon de légumes maison Anaïs ! Je le fais la veille. Et toi, des astuces ?', 2, true, NOW() - INTERVAL '2 days 14 hours', NOW()),
-- Valentin (chef gastronomique) partage son expertise
(61, 74, 'Le secret : ajouter le bouillon chaud louche par louche ! Jamais froid 🔥', 2, true, NOW() - INTERVAL '2 days 12 hours', NOW()),
-- Thomas remercie
(3, 75, 'Merci Valentin ! Je teste ça ce weekend. Vous me donnerez votre avis ! 😊', 2, true, NOW() - INTERVAL '2 days 10 hours', NOW()),

-- Discussion 4: Fil sur la littérature de Marie (post 8)
-- Lucas a répondu sur Camus (post 14), Marie développe
(8, 14, 'Oui Lucas ! "La Peste" est magistral aussi. Tu as préféré lequel ? 📖', 2, true, NOW() - INTERVAL '4 hours 30 minutes', NOW()),
-- Lucas donne son avis
(5, 76, 'Difficile de choisir... "L''Étranger" me touche plus personnellement 🤔', 2, true, NOW() - INTERVAL '4 hours', NOW()),
-- Romane (journaliste littéraire) rejoint
(48, 77, 'Camus reste intemporel ! Son style d''écriture est unique. Vous connaissez ses essais ?', 2, true, NOW() - INTERVAL '3 hours 30 minutes', NOW()),
-- Marie répond à Romane
(8, 78, 'Le mythe de Sisyphe ! Philosophie et littérature parfaitement mélangées ✨', 2, true, NOW() - INTERVAL '3 hours', NOW()),
-- Zoé (libraire) enrichit la discussion
(40, 79, 'En parlant de philosophes-écrivains, vous avez lu Sartre ? Complémentaire à Camus', 2, true, NOW() - INTERVAL '2 hours 30 minutes', NOW()),

-- Discussion 5: Fil sur la musique d'Antoine (post 9)
-- Camille a répondu (post 15), Antoine peut préciser
(9, 15, 'Merci Camille ! 🎵 C''est un mélange jazz-fusion avec des influences électro. Tu joues ?', 2, true, NOW() - INTERVAL '2 hours', NOW()),
-- Camille répond
(6, 80, 'Un peu de piano ! J''aimerais bien entendre ta compo. Tu enregistres bientôt ?', 2, true, NOW() - INTERVAL '1 hour 45 minutes', NOW()),
-- Kevin (musicien rock) s'intéresse
(19, 81, 'Jazz-électro, ça sonne intéressant ! Moi je suis plutôt rock mais j''aime expérimenter 🎸', 2, true, NOW() - INTERVAL '1 hour 30 minutes', NOW()),
-- Antoine répond aux deux
(9, 82, 'On devrait tous jammer ensemble ! Camille au piano, Kevin à la guitare... 🎶', 2, true, NOW() - INTERVAL '1 hour 15 minutes', NOW()),
-- Léon (pianiste classique) propose ses services
(63, 83, 'Pianiste classique ici ! Si vous voulez des arrangements plus sophistiqués... 🎹', 2, true, NOW() - INTERVAL '1 hour', NOW()),
-- Lana (chanteuse) complète le groupe
(74, 84, 'Et si vous avez besoin d''une voix ! J''adore les projets collaboratifs 🎤', 2, true, NOW() - INTERVAL '45 minutes', NOW()),

-- Discussion 6: Nouveau fil sur le cinéma (post de Nicolas)
-- Jean a demandé quel film (post 31), Nicolas répond
(13, 31, 'The Irishman ! 3h30 de pur bonheur. Scorsese maîtrise toujours autant 🎬', 2, true, NOW() - INTERVAL '7 hours', NOW()),
-- Sacha (réalisateur amateur) rejoint
(53, 85, 'Chef-d''œuvre ! La direction photo est incroyable. Tu as vu ses premiers films ?', 2, true, NOW() - INTERVAL '6 hours 30 minutes', NOW()),
-- Nicolas répond à Sacha
(13, 86, 'Taxi Driver reste mon préféré ! Et toi, tu réalises quoi comme genre ?', 2, true, NOW() - INTERVAL '6 hours', NOW()),
-- Discussion technique entre cinéphiles
(53, 87, 'Plutôt court-métrages dramatiques. J''aimerais ton avis sur mon dernier projet ! 🎥', 2, true, NOW() - INTERVAL '5 hours 30 minutes', NOW()),

-- Discussion 7: Fil sur le fitness (post de Laura)
-- Jean a accepté (post 32), Laura organise
(14, 32, 'Parfait Jean ! RDV demain 7h au parc central ? Je prépare une séance adaptée 💪', 2, true, NOW() - INTERVAL '9 hours', NOW()),
-- Emma s'invite
(4, 88, 'Je peux me joindre à vous ? J''adore les séances de groupe ! 🏃‍♀️', 2, true, NOW() - INTERVAL '8 hours 30 minutes', NOW()),
-- Laura accueille Emma
(14, 89, 'Bien sûr Emma ! Plus on est nombreux, plus c''est motivant ✨', 2, true, NOW() - INTERVAL '8 hours', NOW()),
-- Léo (kiné) donne des conseils
(51, 90, 'N''oubliez pas les étirements ! Je peux vous montrer quelques techniques', 2, true, NOW() - INTERVAL '7 hours 30 minutes', NOW()),

-- Discussion 8: Fil sur la programmation (post de Hugo)
-- Lucas a encouragé (post 33), Hugo répond
(15, 33, 'Merci Lucas ! 😅 C''est un jeu en 2D avec Unity. Tu connais bien le moteur ?', 2, true, NOW() - INTERVAL '3 hours 15 minutes', NOW()),
-- Lucas partage son expérience
(5, 91, 'Assez bien ! Pour la 2D, pense aux tilemaps et au système de collisions 🎮', 2, true, NOW() - INTERVAL '2 hours 45 minutes', NOW()),
-- Timéo (dev informatique) apporte son aide
(49, 92, 'Hugo, si tu veux de l''aide sur Unity, je suis dispo ! J''ai fait plusieurs projets', 2, true, NOW() - INTERVAL '2 hours 30 minutes', NOW()),
-- Hugo remercie
(15, 93, 'Merci les gars ! Une communauté de devs, c''est précieux 👨‍💻', 2, true, NOW() - INTERVAL '2 hours', NOW()),

-- Discussion 9: Fil sur l'entrepreneuriat (post de Julien)
-- Mathis a félicité (post 35), Julien développe
(17, 35, 'Merci Mathis ! 🚀 C''est une app de mise en relation pour artisans. Le marché est énorme !', 2, true, NOW() - INTERVAL '21 hours', NOW()),
-- Clémence (architecte) s'intéresse
(28, 94, 'Excellente idée Julien ! En tant qu''architecte, je galère parfois à trouver de bons artisans', 2, true, NOW() - INTERVAL '20 hours', NOW()),
-- Julien voit l'opportunité
(17, 95, 'Exactement le problème qu''on veut résoudre ! Tu accepterais un entretien utilisateur ?', 2, true, NOW() - INTERVAL '19 hours 30 minutes', NOW()),
-- Nathan (étudiant commerce) est curieux
(71, 96, 'Quel modèle économique ? Commission ou abonnement ? 💼', 2, true, NOW() - INTERVAL '19 hours', NOW()),

-- Discussion 10: Fil sur la photographie (post de Camille)
-- Plusieurs photographes échangent
(23, 25, 'Alexandre, tu utilises quel objectif pour ces golden hours ? 📸', 2, true, NOW() - INTERVAL '13 hours', NOW()),
(23, 97, 'Souvent le 85mm f/1.8 ! Il compresse bien l''arrière-plan ✨', 2, true, NOW() - INTERVAL '12 hours 30 minutes', NOW()),
-- Loïc (caméraman) partage ses techniques
(79, 98, 'Pour la vidéo, j''utilise des filtres ND gradués. Ça marche aussi en photo ! 🎥', 2, true, NOW() - INTERVAL '12 hours', NOW()),

-- Nouvelles discussions spontanées
-- Discussion sur la science (post de Maxime)
(37, 11, 'Les fractales et la physique quantique sont liées ! Avez-vous exploré cette connexion ? 🧮', 2, true, NOW() - INTERVAL '1 hour 30 minutes', NOW()),
(11, 99, 'Théo ! Excellente question. Les structures auto-similaires apparaissent partout en physique', 2, true, NOW() - INTERVAL '1 hour', NOW()),
(29, 100, 'En astronomie aussi ! Les galaxies, les amas d''étoiles... Patterns fractals partout 🌌', 2, true, NOW() - INTERVAL '30 minutes', NOW()),

-- Discussion sur l'écologie
(20, 57, 'Océane, ton message écologique me parle ! On fait quoi concrètement pour les océans ? 🌊', 2, true, NOW() - INTERVAL '3 hours', NOW()),
(50, 101, 'Actions locales : nettoyage des plages, sensibilisation... Chaque geste compte ! 🐠', 2, true, NOW() - INTERVAL '2 hours 30 minutes', NOW()),
(32, 102, 'Et réduire le plastique ! En tant que vétérinaire, je vois les dégâts sur la faune', 2, true, NOW() - INTERVAL '2 hours', NOW());

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
(10, 6), -- art (post mode)
(16, 10), -- cinema
(17, 1),  -- sport/fitness
(17, 13), -- fitness
(18, 2),  -- technologie
(19, 4),  -- voyage
(20, 2),  -- technologie/startup
(21, 6),  -- art
(22, 5),  -- musique
(23, 7),  -- science/biologie
(23, 9),  -- nature
(24, 8),  -- politique
(25, 6),  -- art/photographie
(26, 7),  -- science/médecine
(27, 6),  -- art/design
(28, 3),  -- cuisine/pâtisserie
(28, 15), -- humour
(29, 12), -- gaming
(30, 6),  -- art/architecture
(31, 7),  -- science/astronomie
(32, 1),  -- sport/yoga
(32, 13), -- fitness
(42, 3),  -- café/cuisine
(43, 6),  -- art/danse
(44, 7),  -- science/psychologie
(45, 4),  -- voyage/humanitaire
(46, 11), -- littérature
(47, 7),  -- science/nutrition
(47, 13), -- fitness
(48, 3),  -- cuisine/gastronomie
(49, 1),  -- sport/surf
(50, 7),  -- science/médecine
(51, 5),  -- musique
(51, 6);  -- art

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
(12, 10, true, true, NOW() - INTERVAL '45 minutes', NOW()),
(1, 16, true, true, NOW() - INTERVAL '7 hours 45 minutes', NOW()),
(2, 16, true, false, NOW() - INTERVAL '7 hours 30 minutes', NOW()),
(8, 16, true, true, NOW() - INTERVAL '7 hours', NOW()),
(4, 17, true, true, NOW() - INTERVAL '9 hours 30 minutes', NOW()),
(14, 17, true, false, NOW() - INTERVAL '9 hours', NOW()),
(30, 17, true, true, NOW() - INTERVAL '8 hours 30 minutes', NOW()),
(5, 18, true, true, NOW() - INTERVAL '3 hours 30 minutes', NOW()),
(15, 18, true, false, NOW() - INTERVAL '3 hours', NOW()),
(25, 18, true, true, NOW() - INTERVAL '2 hours 45 minutes', NOW()),
(2, 19, true, true, NOW() - INTERVAL '1 day 17 hours', NOW()),
(16, 19, true, false, NOW() - INTERVAL '1 day 16 hours', NOW()),
(4, 19, true, true, NOW() - INTERVAL '1 day 15 hours', NOW()),
(17, 20, true, true, NOW() - INTERVAL '21 hours', NOW()),
(5, 20, true, false, NOW() - INTERVAL '20 hours', NOW()),
(25, 20, true, true, NOW() - INTERVAL '19 hours', NOW()),
(2, 21, true, true, NOW() - INTERVAL '5 hours 30 minutes', NOW()),
(6, 21, true, false, NOW() - INTERVAL '5 hours', NOW()),
(18, 21, true, true, NOW() - INTERVAL '4 hours 30 minutes', NOW()),
(9, 22, true, true, NOW() - INTERVAL '4 hours 45 minutes', NOW()),
(19, 22, true, false, NOW() - INTERVAL '4 hours 30 minutes', NOW()),
(63, 22, true, true, NOW() - INTERVAL '4 hours', NOW()),
(6, 23, true, true, NOW() - INTERVAL '11 hours 30 minutes', NOW()),
(20, 23, true, false, NOW() - INTERVAL '11 hours', NOW()),
(32, 23, true, true, NOW() - INTERVAL '10 hours 30 minutes', NOW()),
(11, 24, true, true, NOW() - INTERVAL '17 hours 30 minutes', NOW()),
(24, 24, true, false, NOW() - INTERVAL '17 hours', NOW()),
(42, 24, true, true, NOW() - INTERVAL '16 hours 30 minutes', NOW()),
(6, 25, true, true, NOW() - INTERVAL '13 hours', NOW()),
(23, 25, true, false, NOW() - INTERVAL '12 hours 30 minutes', NOW()),
(2, 25, true, true, NOW() - INTERVAL '12 hours', NOW()),
(3, 26, true, true, NOW() - INTERVAL '8 hours 30 minutes', NOW()),
(26, 26, true, false, NOW() - INTERVAL '8 hours', NOW()),
(54, 26, true, true, NOW() - INTERVAL '7 hours 30 minutes', NOW()),
(5, 27, true, true, NOW() - INTERVAL '15 hours 30 minutes', NOW()),
(15, 27, true, false, NOW() - INTERVAL '15 hours', NOW()),
(27, 27, true, true, NOW() - INTERVAL '14 hours 30 minutes', NOW()),
(3, 42, true, true, NOW() - INTERVAL '14 hours 30 minutes', NOW()),
(31, 42, true, false, NOW() - INTERVAL '14 hours', NOW()),
(58, 42, true, true, NOW() - INTERVAL '13 hours 30 minutes', NOW()),
(22, 43, true, true, NOW() - INTERVAL '1 day 11 hours', NOW()),
(34, 43, true, false, NOW() - INTERVAL '1 day 10 hours', NOW()),
(68, 43, true, true, NOW() - INTERVAL '1 day 9 hours', NOW()),
(26, 44, true, true, NOW() - INTERVAL '7 hours 30 minutes', NOW()),
(38, 44, true, false, NOW() - INTERVAL '7 hours', NOW()),
(24, 44, true, true, NOW() - INTERVAL '6 hours 30 minutes', NOW()),
(30, 45, true, true, NOW() - INTERVAL '1 day 22 hours', NOW()),
(42, 45, true, false, NOW() - INTERVAL '1 day 21 hours', NOW()),
(68, 45, true, true, NOW() - INTERVAL '1 day 20 hours', NOW()),
(8, 46, true, true, NOW() - INTERVAL '5 hours 30 minutes', NOW()),
(11, 46, true, false, NOW() - INTERVAL '5 hours', NOW()),
(28, 46, true, true, NOW() - INTERVAL '4 hours 30 minutes', NOW()),
(14, 47, true, true, NOW() - INTERVAL '12 hours 30 minutes', NOW()),
(30, 47, true, false, NOW() - INTERVAL '12 hours', NOW()),
(54, 47, true, true, NOW() - INTERVAL '11 hours 30 minutes', NOW()),
(3, 48, true, true, NOW() - INTERVAL '3 hours 30 minutes', NOW()),
(26, 48, true, false, NOW() - INTERVAL '3 hours', NOW()),
(61, 48, true, true, NOW() - INTERVAL '2 hours 30 minutes', NOW()),
(4, 49, true, true, NOW() - INTERVAL '9 hours 30 minutes', NOW()),
(65, 49, true, false, NOW() - INTERVAL '9 hours', NOW()),
(14, 49, true, true, NOW() - INTERVAL '8 hours 30 minutes', NOW()),
(24, 50, true, true, NOW() - INTERVAL '16 hours 30 minutes', NOW()),
(42, 50, true, false, NOW() - INTERVAL '16 hours', NOW()),
(70, 50, true, true, NOW() - INTERVAL '15 hours 30 minutes', NOW()),
(9, 51, true, true, NOW() - INTERVAL '1 day 7 hours', NOW()),
(19, 51, true, false, NOW() - INTERVAL '1 day 6 hours', NOW()),
(74, 51, true, true, NOW() - INTERVAL '1 day 5 hours', NOW());

-- Insertion de mentions
INSERT INTO cercle.mentions (id_user, id_post, notif_view) VALUES 
(2, 11, true),  -- Jean mentionne Sophie dans sa réponse
(4, 12, false), -- Thomas mentionne Emma dans sa réponse
(3, 13, true),  -- Sophie mentionne Thomas dans sa réponse
(8, 14, false), -- Lucas mentionne Marie dans sa réponse
(9, 15, true),  -- Camille mentionne Antoine dans sa réponse
(14, 33, true),  -- Laura mentionnée dans une réponse sur le fitness
(16, 34, false), -- Chloé mentionnée dans une réponse sur le voyage
(18, 35, true),  -- Manon mentionnée dans une réponse sur l'art
(26, 36, false), -- Anaïs mentionnée dans une réponse sur la pâtisserie
(30, 37, true),  -- Elsa mentionnée dans une réponse sur le bien-être
(42, 38, false), -- Sarah mentionnée dans une réponse sur l'humanitaire
(54, 39, true),  -- Maëlle mentionnée dans une réponse sur la nutrition
(61, 40, false), -- Valentin mentionné dans une réponse sur la gastronomie
(70, 41, true);  -- Diane mentionnée dans une réponse sur la dermatologie

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
(1, 6, 'Camille, tes photos de nature sont toujours aussi magnifiques !', NOW() - INTERVAL '1 hour', NULL, true, NOW()),
(13, 1, 'Salut Jean ! J''ai vu que tu aimais aussi la tech, on devrait échanger nos avis', NOW() - INTERVAL '5 hours', NOW() - INTERVAL '4 hours 30 minutes', true, NOW()),
(1, 13, 'Avec plaisir Nicolas ! Quel est ton domaine de prédilection ?', NOW() - INTERVAL '4 hours 30 minutes', NOW() - INTERVAL '4 hours', true, NOW()),
(14, 4, 'Emma, j''aimerais organiser des séances fitness en groupe, tu es partante ?', NOW() - INTERVAL '8 hours', NOW() - INTERVAL '7 hours 30 minutes', true, NOW()),
(4, 14, 'Excellente idée Laura ! Je connais un parc parfait pour ça', NOW() - INTERVAL '7 hours 30 minutes', NOW() - INTERVAL '7 hours', true, NOW()),
(15, 5, 'Lucas, tu as des conseils pour débuter dans le développement de jeux ?', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '11 hours 30 minutes', true, NOW()),
(5, 15, 'Bien sûr Hugo ! Commence par Unity ou Godot, je peux t''aider', NOW() - INTERVAL '11 hours 30 minutes', NOW() - INTERVAL '11 hours', true, NOW()),
(16, 2, 'Sophie, tes créations m''inspirent énormément ! Tu donnes des cours ?', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day 20 hours', true, NOW()),
(2, 16, 'Merci Chloé ! Je ne donne pas de cours mais on peut échanger des techniques', NOW() - INTERVAL '1 day 20 hours', NOW() - INTERVAL '1 day 18 hours', true, NOW()),
(17, 11, 'Maxime, j''aurais besoin de conseils scientifiques pour ma startup', NOW() - INTERVAL '18 hours', NOW() - INTERVAL '16 hours', true, NOW()),
(11, 17, 'Je serais ravi de t''aider Julien ! Quel domaine exactement ?', NOW() - INTERVAL '16 hours', NOW() - INTERVAL '15 hours', true, NOW()),
(18, 25, 'Mathis, j''adore ton style graphique ! On pourrait collaborer ?', NOW() - INTERVAL '10 hours', NOW() - INTERVAL '9 hours 30 minutes', true, NOW()),
(25, 18, 'Avec grand plaisir Manon ! Art et design vont si bien ensemble', NOW() - INTERVAL '9 hours 30 minutes', NOW() - INTERVAL '9 hours', true, NOW()),
(23, 29, 'Florian, tes photos d''astronomie sont époustouflantes !', NOW() - INTERVAL '15 hours', NOW() - INTERVAL '14 hours 30 minutes', true, NOW()),
(29, 23, 'Merci Alexandre ! On devrait faire une sortie observation ensemble', NOW() - INTERVAL '14 hours 30 minutes', NOW() - INTERVAL '14 hours', true, NOW()),
(30, 38, 'Luna, j''aimerais intégrer la psychologie dans mes cours de yoga', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '5 hours 30 minutes', true, NOW()),
(38, 30, 'Excellente approche Elsa ! Le bien-être mental et physique sont liés', NOW() - INTERVAL '5 hours 30 minutes', NOW() - INTERVAL '5 hours', true, NOW()),
(42, 68, 'Éléa, on pourrait organiser une mission commune ?', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days 20 hours', true, NOW()),
(68, 42, 'Bonne idée Sarah ! Santé et humanitaire vont de pair', NOW() - INTERVAL '2 days 20 hours', NOW() - INTERVAL '2 days 18 hours', true, NOW()),
(54, 26, 'Anaïs, j''aimerais allier nutrition et pâtisserie, des idées ?', NOW() - INTERVAL '4 hours', NOW() - INTERVAL '3 hours 30 minutes', true, NOW()),
(26, 54, 'Défi intéressant Maëlle ! Pâtisserie santé, pourquoi pas ?', NOW() - INTERVAL '3 hours 30 minutes', NOW() - INTERVAL '3 hours', true, NOW()),
(61, 48, 'Valentin, ton risotto avait l''air délicieux ! Recette ?', NOW() - INTERVAL '2 hours', NULL, true, NOW()),
(65, 69, 'Lorenzo, séance d''entraînement surf/vélo ? Combo cardio parfait !', NOW() - INTERVAL '1 hour', NULL, true, NOW()),
(22, 7, 'Pierre, nous avons plusieurs nouveaux signalements à traiter', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '5 hours 30 minutes', true, NOW()),
(7, 22, 'Parfait Pauline, je regarde les plus urgents en premier', NOW() - INTERVAL '5 hours 30 minutes', NOW() - INTERVAL '5 hours', true, NOW()),
(72, 10, 'Julie, les nouveaux utilisateurs s''intègrent bien dans la communauté', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 30 minutes', true, NOW()),
(10, 72, 'Excellente nouvelle Amélie ! Notre travail de modération porte ses fruits', NOW() - INTERVAL '1 hour 30 minutes', NOW() - INTERVAL '1 hour', true, NOW());

-- Extension des signalements (quelques cas supplémentaires)
INSERT INTO cercle.report (id_user, id_post, reported_at, raison) VALUES 
(22, 18, NOW() - INTERVAL '3 hours', 'Code partagé sans licence, potentiel problème de droits'),
(7, 27, NOW() - INTERVAL '2 hours', 'Contenu gaming potentiellement inapproprié pour mineurs'),
(10, 21, NOW() - INTERVAL '1 hour 30 minutes', 'Propos artistiques ambigus, vérification nécessaire'),
(72, 42, NOW() - INTERVAL '45 minutes', 'Promotion de produit sans déclaration publicitaire'),
(22, 49, NOW() - INTERVAL '30 minutes', 'Localisation de sport extrême sans avertissement sécurité');

-- Insertion de quelques signalements
INSERT INTO cercle.report (id_user, id_post, reported_at, raison) VALUES 
(7, 5, NOW() - INTERVAL '2 hours', 'Contenu inapproprié pour les mineurs'),
(10, 9, NOW() - INTERVAL '1 hour', 'Informations scientifiques non vérifiées'),
(2, 1, NOW() - INTERVAL '30 minutes', 'Spam/promotion excessive');

-- Insertion d''un bannissement (exemple)
INSERT INTO cercle.user_bannissements (user_banni, banni_by, raison, debut_ban, fin_ban) VALUES 
(5, 7, 'Violation des règles de la communauté - contenu inapproprié répété', NOW() - INTERVAL '1 day', NOW() + INTERVAL '6 days');
