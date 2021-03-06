from django.db import models

class Score(models.Model):
	name = models.CharField(max_length=25)
	score = models.IntegerField()
	date = models.DateField(auto_now_add=True)

	def __str__(self):
		return self.username

	class Meta:
		ordering = ['-score']
