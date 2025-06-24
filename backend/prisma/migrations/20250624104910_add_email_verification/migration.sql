-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "cercle";

-- CreateTable
CREATE TABLE "cercle"."roles" (
    "id_role" SERIAL NOT NULL,
    "role" VARCHAR(50) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "cercle"."langues" (
    "id_langue" SERIAL NOT NULL,
    "langue" VARCHAR(50) NOT NULL,

    CONSTRAINT "langues_pkey" PRIMARY KEY ("id_langue")
);

-- CreateTable
CREATE TABLE "cercle"."themes" (
    "id_theme" SERIAL NOT NULL,
    "theme" VARCHAR(50) NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("id_theme")
);

-- CreateTable
CREATE TABLE "cercle"."message_type" (
    "id_message_type" SERIAL NOT NULL,
    "message_type" VARCHAR(50) NOT NULL,

    CONSTRAINT "message_type_pkey" PRIMARY KEY ("id_message_type")
);

-- CreateTable
CREATE TABLE "cercle"."tags" (
    "id_tag" SERIAL NOT NULL,
    "tag" VARCHAR(50) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id_tag")
);

-- CreateTable
CREATE TABLE "cercle"."type_media" (
    "id_media" SERIAL NOT NULL,
    "media" VARCHAR(50) NOT NULL,

    CONSTRAINT "type_media_pkey" PRIMARY KEY ("id_media")
);

-- CreateTable
CREATE TABLE "cercle"."users" (
    "id_user" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "prenom" VARCHAR(50) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "mail" VARCHAR(50) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "telephone" VARCHAR(20),
    "bio" VARCHAR(255),
    "photo_profil" VARCHAR(255),
    "id_role" INTEGER NOT NULL,
    "private" BOOLEAN NOT NULL,
    "certified" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3),
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_code" VARCHAR(6),
    "verification_code_expires_at" TIMESTAMP(3),
    "verification_attempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "cercle"."user_preferences" (
    "id_user" INTEGER NOT NULL,
    "id_langue" INTEGER NOT NULL,
    "email_notification" BOOLEAN NOT NULL,
    "id_theme" INTEGER NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "cercle"."messages_prives" (
    "id_message" SERIAL NOT NULL,
    "sender" INTEGER NOT NULL,
    "receiver" INTEGER NOT NULL,
    "message" VARCHAR(2048) NOT NULL,
    "send_at" TIMESTAMP(3) NOT NULL,
    "read_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_prives_pkey" PRIMARY KEY ("id_message")
);

-- CreateTable
CREATE TABLE "cercle"."user_bannissements" (
    "id_bannissement" SERIAL NOT NULL,
    "user_banni" INTEGER NOT NULL,
    "banni_by" INTEGER NOT NULL,
    "raison" VARCHAR(1024) NOT NULL,
    "debut_ban" TIMESTAMP(3) NOT NULL,
    "fin_ban" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_bannissements_pkey" PRIMARY KEY ("id_bannissement")
);

-- CreateTable
CREATE TABLE "cercle"."follow" (
    "follower" INTEGER NOT NULL,
    "account" INTEGER NOT NULL,
    "pending" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "notif_view" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("follower","account")
);

-- CreateTable
CREATE TABLE "cercle"."post" (
    "id_post" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "post_parent" INTEGER,
    "content" VARCHAR(280) NOT NULL,
    "id_message_type" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id_post")
);

-- CreateTable
CREATE TABLE "cercle"."post_tags" (
    "id_post" INTEGER NOT NULL,
    "id_tag" INTEGER NOT NULL,

    CONSTRAINT "post_tags_pkey" PRIMARY KEY ("id_post","id_tag")
);

-- CreateTable
CREATE TABLE "cercle"."img_vid_post" (
    "id_img_vid_post" SERIAL NOT NULL,
    "id_post" INTEGER NOT NULL,
    "id_media" INTEGER NOT NULL,
    "lien_media" VARCHAR(255) NOT NULL,

    CONSTRAINT "img_vid_post_pkey" PRIMARY KEY ("id_img_vid_post")
);

-- CreateTable
CREATE TABLE "cercle"."img_vid_msg" (
    "id_img_vid_msg" SERIAL NOT NULL,
    "id_message" INTEGER NOT NULL,
    "id_media" INTEGER NOT NULL,
    "lien_media" VARCHAR(255) NOT NULL,

    CONSTRAINT "img_vid_msg_pkey" PRIMARY KEY ("id_img_vid_msg")
);

-- CreateTable
CREATE TABLE "cercle"."likes" (
    "id_user" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "notif_view" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id_user","id_post")
);

-- CreateTable
CREATE TABLE "cercle"."mentions" (
    "id_user" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,
    "notif_view" BOOLEAN NOT NULL,

    CONSTRAINT "mentions_pkey" PRIMARY KEY ("id_user","id_post")
);

-- CreateTable
CREATE TABLE "cercle"."report" (
    "id_user" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,
    "reported_at" TIMESTAMP(3) NOT NULL,
    "raison" VARCHAR(255) NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id_user","id_post")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "cercle"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_mail_key" ON "cercle"."users"("mail");

-- AddForeignKey
ALTER TABLE "cercle"."users" ADD CONSTRAINT "users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "cercle"."roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."user_preferences" ADD CONSTRAINT "user_preferences_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "cercle"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."user_preferences" ADD CONSTRAINT "user_preferences_id_langue_fkey" FOREIGN KEY ("id_langue") REFERENCES "cercle"."langues"("id_langue") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."user_preferences" ADD CONSTRAINT "user_preferences_id_theme_fkey" FOREIGN KEY ("id_theme") REFERENCES "cercle"."themes"("id_theme") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."messages_prives" ADD CONSTRAINT "messages_prives_sender_fkey" FOREIGN KEY ("sender") REFERENCES "cercle"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."messages_prives" ADD CONSTRAINT "messages_prives_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "cercle"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."user_bannissements" ADD CONSTRAINT "user_bannissements_user_banni_fkey" FOREIGN KEY ("user_banni") REFERENCES "cercle"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."user_bannissements" ADD CONSTRAINT "user_bannissements_banni_by_fkey" FOREIGN KEY ("banni_by") REFERENCES "cercle"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."follow" ADD CONSTRAINT "follow_follower_fkey" FOREIGN KEY ("follower") REFERENCES "cercle"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."follow" ADD CONSTRAINT "follow_account_fkey" FOREIGN KEY ("account") REFERENCES "cercle"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."post" ADD CONSTRAINT "post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "cercle"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."post" ADD CONSTRAINT "post_id_message_type_fkey" FOREIGN KEY ("id_message_type") REFERENCES "cercle"."message_type"("id_message_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."post" ADD CONSTRAINT "post_post_parent_fkey" FOREIGN KEY ("post_parent") REFERENCES "cercle"."post"("id_post") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."post_tags" ADD CONSTRAINT "post_tags_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "cercle"."post"("id_post") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."post_tags" ADD CONSTRAINT "post_tags_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "cercle"."tags"("id_tag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."img_vid_post" ADD CONSTRAINT "img_vid_post_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "cercle"."post"("id_post") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."img_vid_post" ADD CONSTRAINT "img_vid_post_id_media_fkey" FOREIGN KEY ("id_media") REFERENCES "cercle"."type_media"("id_media") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."img_vid_msg" ADD CONSTRAINT "img_vid_msg_id_message_fkey" FOREIGN KEY ("id_message") REFERENCES "cercle"."messages_prives"("id_message") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."img_vid_msg" ADD CONSTRAINT "img_vid_msg_id_media_fkey" FOREIGN KEY ("id_media") REFERENCES "cercle"."type_media"("id_media") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."likes" ADD CONSTRAINT "likes_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "cercle"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."likes" ADD CONSTRAINT "likes_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "cercle"."post"("id_post") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."mentions" ADD CONSTRAINT "mentions_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "cercle"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."mentions" ADD CONSTRAINT "mentions_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "cercle"."post"("id_post") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."report" ADD CONSTRAINT "report_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "cercle"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cercle"."report" ADD CONSTRAINT "report_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "cercle"."post"("id_post") ON DELETE RESTRICT ON UPDATE CASCADE;
