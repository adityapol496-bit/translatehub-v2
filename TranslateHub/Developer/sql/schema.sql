-- ============================================================
-- TranslateHub — Database Schema (SQLite)
-- Auto-generated from Django models (translator_app/models.py)
-- Run automatically via: python manage.py migrate
-- This file is for reference / documentation purposes.
-- ============================================================

-- Django's built-in User table (auth_user) — created by Django itself
CREATE TABLE IF NOT EXISTS auth_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(150) UNIQUE NOT NULL,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    email VARCHAR(254),
    password VARCHAR(128) NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    is_staff BOOLEAN DEFAULT 0,
    is_superuser BOOLEAN DEFAULT 0,
    date_joined DATETIME,
    last_login DATETIME
);

-- Anonymous browser session, so History works without login
CREATE TABLE IF NOT EXISTS translator_app_chatsession (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id VARCHAR(64) UNIQUE NOT NULL,   -- UUID generated on the frontend
    created_at DATETIME NOT NULL
);

-- Extra profile fields for a logged-in user (beyond Django's built-in User)
CREATE TABLE IF NOT EXISTS translator_app_userprofile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    phone VARCHAR(20) DEFAULT '',
    preferred_lang VARCHAR(10) DEFAULT 'en',
    FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE CASCADE
);

-- One translated message — stored for the History feature and analytics
CREATE TABLE IF NOT EXISTS translator_app_translation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,                          -- NULL if translated anonymously
    session_id INTEGER,                       -- NULL if translated while logged in
    source_text TEXT NOT NULL,
    translated_text TEXT NOT NULL,
    source_lang VARCHAR(10) DEFAULT 'auto',
    target_lang VARCHAR(10) NOT NULL,
    detected_lang VARCHAR(10),
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES translator_app_chatsession (id) ON DELETE CASCADE
);

-- Helpful indexes for common lookups
CREATE INDEX IF NOT EXISTS idx_translation_user ON translator_app_translation (user_id);
CREATE INDEX IF NOT EXISTS idx_translation_session ON translator_app_translation (session_id);
CREATE INDEX IF NOT EXISTS idx_translation_created ON translator_app_translation (created_at);

-- ============================================================
-- Table relationships:
--   auth_user (1) ───< (many) translator_app_translation
--   auth_user (1) ─── (1)     translator_app_userprofile
--   translator_app_chatsession (1) ───< (many) translator_app_translation
-- ============================================================
