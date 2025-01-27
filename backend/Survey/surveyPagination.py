from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class SurveyPagination(PageNumberPagination) :

    page_size = 5
    page_query_param = 'page'
    page_size_query_param = 'page_size' # Allows dynamic page size
    max_page_size = 100
    
    def get_paginated_response(self, data):
        return Response({
            'count' : self.page.paginator.count,
            'next' : self.get_next_link(),
            'previous' : self.get_previous_link(),
            'current_page' : self.page.number,
            'next_page' : self.page.next_page_number() if self.page.has_next() else False,
            'previous_page' : self.page.previous_page_number() if self.page.has_previous() else False,
            'total_pages' : self.page.paginator.num_pages,
            'results' : data
        })