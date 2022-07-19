from django.shortcuts import render, redirect
from .models import Score

def index(request):

	if request.method == 'POST':
		name = request.POST.get('name')
		score = request.POST.get('score')
		
		print(f'#{name}# %{score}%')

		if name not in [None, '', ' '] and score not in [None, '', ' ']:
			Score.objects.create(
				name=name.strip(" "),
				score=score.strip(" ")
			)
			return redirect('home')
		
	leaderboard = Score.objects.all()[:5]

	context = {'leaderboard':leaderboard}
	return render(request, 'base/index.html', context)
