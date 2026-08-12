from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("translator_app", "0002_userprofile_translation_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="photo_base64",
            field=models.TextField(blank=True, default=""),
        ),
    ]
