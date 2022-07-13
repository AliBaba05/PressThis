from django.shortcuts import render, redirect
from .models import Score

def index(request):

	if request.method == 'POST':
		name = request.POST.get('name').strip(" ")
		score = request.POST.get('score').strip(" ")
		
		print(name, score)

		if name != None or '' and score != None or '':
			Score.objects.create(
				name=name,
				score=score
			)
			return redirect('home')
		
	leaderboard = Score.objects.all()[:5]

	context = {'leaderboard':leaderboard}
	return render(request, 'base/index.html', context)
