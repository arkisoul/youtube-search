from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from googleapiclient.discovery import build
import json

def index(request):
    return render(request, 'index.html', {})

@api_view(['GET'])
def youtube(request):
    term = request.query_params.get('term')
    GOOGLE_API_KEY = settings.GOOGLE_API_KEY
    youtube = build('youtube', 'v3', developerKey = GOOGLE_API_KEY)
    youtube_request = youtube.search().list(
        q=term, 
        part='snippet',
        type='video',
        maxResults=10
    )
    res = youtube_request.execute()
    return Response(json.dumps(res))