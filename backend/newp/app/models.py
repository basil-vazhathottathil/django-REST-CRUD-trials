from django.db import models

# Create your models here.
class Book(models.Model):
    bookTitle = models.CharField(max_length=50)
    releaseYear =models.IntegerField()

    def __str__(self):
        return self.bookTitle