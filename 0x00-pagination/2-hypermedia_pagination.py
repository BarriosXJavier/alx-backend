#!/usr/bin/env python3
"""
Simple pagination
"""
import csv
import math
from typing import List, Dict, Tuple


class Server:
    """Server class to paginate database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """returns a dataset for a given datarange"""

        assert type(page) == int and type(page_size) == int
        assert page > 0 and page_size > 0
        start, end = index_range(page, page_size)
        data = self.dataset()
        if start > len(data):
            return []
        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """Retrieves information about a page."""
        data = self.get_page(page, page_size)
        start, end = index_range(page, page_size)
        total_pages = math.ceil(len(self.__dataset) / page_size)
        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": page + 1 if end < len(self.__dataset) else None,
            "prev_page": page - 1 if start > 0 else None,
            "total_pages": total_pages,
        }


def index_range(page, page_size) -> tuple:
    """named index_range that takes two integer
    arguments page and page_size
    """

    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return start_index, end_index
