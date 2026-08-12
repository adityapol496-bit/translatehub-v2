from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("translator_app", "0003_userprofile_photo_base64"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="otp_code",
            field=models.CharField(blank=True, default="", max_length=6),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="otp_expires_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
