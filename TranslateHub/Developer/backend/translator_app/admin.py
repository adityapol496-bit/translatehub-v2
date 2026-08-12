from django.contrib import admin

from .models import ChatSession, Translation, UserProfile


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ("session_id", "created_at")


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "phone", "preferred_lang")


@admin.register(Translation)
class TranslationAdmin(admin.ModelAdmin):
    list_display = ("user", "source_lang", "target_lang", "source_text", "translated_text", "created_at")
    list_filter = ("source_lang", "target_lang")
    search_fields = ("source_text", "translated_text")
