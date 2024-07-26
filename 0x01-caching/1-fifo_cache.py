#!/usr/bin/env python3
"""  FIFO caching """
from typing import Any
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFO Caching class """

    def __init__(self):
        """ initialize FIFOCache """
        super().__init__()
        self.queue = []

    def put(self, key: Any, item: Any) -> None:
        """add an item in the cache"""

        if key is None and item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            first_key = self.queue[0]
            self.queue = self.queue[1:]
            del self.cache_data[first_key]
            print("DISCARD:", first_key)

        self.cache_data[key] = item
        self.queue.append(key)

    def get(self, key):
        """retrive an item from  cache"""

        if key is None or key not in self.cache_data:
            return None
        return self.cache_data.get(key)
