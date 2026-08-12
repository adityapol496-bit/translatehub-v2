import uuid

from django.contrib.auth.models import User
from django.db import models


class ChatSession(models.Model):
    """A single browser/user session, so history can be grouped per visitor."""

    session_id = models.CharField(max_length=64, unique=True, default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.session_id)


class UserProfile(models.Model):
    """Extra profile fields for a logged-in user (beyond Django's built-in User)."""

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=20, blank=True, default="")
    preferred_lang = models.CharField(max_length=10, default="en")
    photo_base64 = models.TextField(blank=True, default="")  # optional uploaded profile photo (data URL)
    otp_code = models.CharField(max_length=6, blank=True, default="")
    otp_expires_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Profile of {self.user.username}"


class Translation(models.Model):
    """One translated message — stored for the History feature and analytics."""

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="translations",
        null=True, blank=True,
    )
    session = models.ForeignKey(
        ChatSession, on_delete=models.CASCADE, related_name="translations",
        null=True, blank=True,
    )
    source_text = models.TextField()
    translated_text = models.TextField()
    source_lang = models.CharField(max_length=10, default="auto")
    target_lang = models.CharField(max_length=10)
    detected_lang = models.CharField(max_length=10, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"[{self.source_lang} → {self.target_lang}] {self.source_text[:30]}"
