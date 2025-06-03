-- ************************* Procédure stockée pour créer un utilisateur *************************

CREATE OR REPLACE FUNCTION cercle.create_user(
    p_nom VARCHAR(50),
    p_prenom VARCHAR(50),
    p_username VARCHAR(20),
    p_mail VARCHAR(50),
    p_password_hash VARCHAR(255),
    p_telephone VARCHAR(20) DEFAULT NULL,
    p_bio VARCHAR(255) DEFAULT NULL,
    p_photo_profil VARCHAR(255) DEFAULT NULL,
    p_id_role INTEGER DEFAULT 1,
    p_private BOOLEAN DEFAULT FALSE,
    p_certified BOOLEAN DEFAULT FALSE,
    p_id_langue INTEGER DEFAULT 1,
    p_email_notification BOOLEAN DEFAULT TRUE,
    p_id_theme INTEGER DEFAULT 1
)
RETURNS TABLE(
    success BOOLEAN,
    message TEXT,
    user_id INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id INTEGER;
    v_username_exists INTEGER;
    v_email_exists INTEGER;
    v_role_exists INTEGER;
    v_langue_exists INTEGER;
    v_theme_exists INTEGER;
BEGIN
    -- Initialisation des valeurs de retour
    success := FALSE;
    message := '';
    user_id := NULL;
    
    -- Validation des paramètres obligatoires
    IF p_nom IS NULL OR TRIM(p_nom) = '' THEN
        message := 'Le nom est obligatoire';
        RETURN NEXT;
        RETURN;
    END IF;
    
    IF p_prenom IS NULL OR TRIM(p_prenom) = '' THEN
        message := 'Le prénom est obligatoire';
        RETURN NEXT;
        RETURN;
    END IF;
    
    IF p_username IS NULL OR TRIM(p_username) = '' THEN
        message := 'Le nom d''utilisateur est obligatoire';
        RETURN NEXT;
        RETURN;
    END IF;
    
    IF p_mail IS NULL OR TRIM(p_mail) = '' THEN
        message := 'L''email est obligatoire';
        RETURN NEXT;
        RETURN;
    END IF;
    
    IF p_password_hash IS NULL OR TRIM(p_password_hash) = '' THEN
        message := 'Le hash du mot de passe est obligatoire';
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- Validation du format email (basique)
    IF p_mail !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        message := 'Format d''email invalide';
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- Validation de la longueur du username (min 3 caractères)
    IF LENGTH(TRIM(p_username)) < 3 THEN
        message := 'Le nom d''utilisateur doit contenir au moins 3 caractères';
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- Vérification de l'unicité du username
    SELECT COUNT(*) INTO v_username_exists
    FROM cercle.users
    WHERE LOWER(username) = LOWER(TRIM(p_username));
    
    IF v_username_exists > 0 THEN
        message := 'Ce nom d''utilisateur existe déjà';
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- Vérification de l'unicité de l'email
    SELECT COUNT(*) INTO v_email_exists
    FROM cercle.users
    WHERE LOWER(mail) = LOWER(TRIM(p_mail));
    
    IF v_email_exists > 0 THEN
        message := 'Cette adresse email est déjà utilisée';
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- Vérification de l'existence du rôle
    SELECT COUNT(*) INTO v_role_exists
    FROM cercle.roles
    WHERE id_role = p_id_role;
    
    IF v_role_exists = 0 THEN
        message := 'Le rôle spécifié n''existe pas';
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- Vérification de l'existence de la langue
    SELECT COUNT(*) INTO v_langue_exists
    FROM cercle.langues
    WHERE id_langue = p_id_langue;
    
    IF v_langue_exists = 0 THEN
        message := 'La langue spécifiée n''existe pas';
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- Vérification de l'existence du thème
    SELECT COUNT(*) INTO v_theme_exists
    FROM cercle.themes
    WHERE id_theme = p_id_theme;
    
    IF v_theme_exists = 0 THEN
        message := 'Le thème spécifié n''existe pas';
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- Validation du téléphone s'il est fourni
    IF p_telephone IS NOT NULL AND TRIM(p_telephone) != '' THEN
        IF p_telephone !~ '^[0-9+\-\s\(\)]{8,20}$' THEN
            message := 'Format de téléphone invalide';
            RETURN NEXT;
            RETURN;
        END IF;
    END IF;
    
    BEGIN
        -- Insertion de l'utilisateur
        INSERT INTO cercle.users (
            nom, prenom, username, mail, password_hash, telephone, bio, photo_profil,
            id_role, "private", certified, is_active, created_at, updated_at
        ) VALUES (
            TRIM(p_nom), TRIM(p_prenom), TRIM(p_username), TRIM(p_mail), p_password_hash,
            CASE WHEN p_telephone IS NULL OR TRIM(p_telephone) = '' THEN NULL ELSE TRIM(p_telephone) END,
            CASE WHEN p_bio IS NULL OR TRIM(p_bio) = '' THEN NULL ELSE TRIM(p_bio) END,
            CASE WHEN p_photo_profil IS NULL OR TRIM(p_photo_profil) = '' THEN NULL ELSE TRIM(p_photo_profil) END,
            p_id_role, p_private, p_certified, TRUE, NOW(), NOW()
        ) RETURNING id_user INTO v_user_id;
        
        -- Insertion des préférences utilisateur
        INSERT INTO cercle.user_preferences (
            id_user, id_langue, email_notification, id_theme
        ) VALUES (
            v_user_id, p_id_langue, p_email_notification, p_id_theme
        );
        
        -- Succès
        success := TRUE;
        message := 'Utilisateur créé avec succès';
        user_id := v_user_id;
        
    EXCEPTION
        WHEN OTHERS THEN
            -- Gestion des erreurs
            success := FALSE;
            message := 'Erreur lors de la création de l''utilisateur: ' || SQLERRM;
            user_id := NULL;
    END;
    
    RETURN NEXT;
    RETURN;
END;
$$;
