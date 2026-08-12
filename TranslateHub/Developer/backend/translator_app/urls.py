from django.urls import path

from . import views

urlpatterns = [
    path("translate/", views.translate_view, name="translate"),
    path("ocr-translate/", views.ocr_translate_view, name="ocr_translate"),
    path("speak/", views.speak_view, name="speak"),
    path("history/", views.history_view, name="history"),
    path("history/clear/", views.clear_history_view, name="clear_history"),
    path("history/<int:translation_id>/delete/", views.delete_history_item_view, name="delete_history_item"),
    path("history/<int:translation_id>/download/", views.download_history_item_view, name="download_history_item"),
    path("auth/signup/", views.signup_view, name="signup"),
    path("auth/login/", views.login_view, name="login"),
    path("auth/forgot-password/", views.forgot_password_view, name="forgot_password"),
    path("auth/verify-otp/", views.verify_otp_view, name="verify_otp"),
    path("auth/reset-password/", views.reset_password_view, name="reset_password"),
    path("auth/google/", views.google_login_view, name="google_login"),
    path("auth/logout/", views.logout_view, name="logout"),
    path("auth/me/", views.me_view, name="me"),
    path("auth/profile/", views.profile_view, name="profile"),
]
