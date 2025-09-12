---
date: "2021-09-06T22:06:53-03:00"
draft: false
title: "How to cache API keys in Python"
---

## Making a timed LRU cache

We’re not going deep in lru_cache in this article. If you want to know more about how the things work under the hood, I suggest two links: [this](https://docs.python.org/3/library/functools.html#functools.lru_cache) link to the official docs, and [this](https://realpython.com/lru-cache-python/) link for a nice tutorial from Real Python.

To use lru_cache, you can simply add the decorator in the function, but the cache will never expire, and it is bad for our problem because API keys do expire, they have a lifespan. We need to expire this cache in a certain time. So, we’ll have to override the decorator with our decorator.

Here is a full code example implementing and showing the decorator in action:

```python
from time import time, sleep
from datetime import datetime, timedelta
from functools import lru_cache, wraps

# Decorator
def timed_lru_cache(seconds: int, maxsize: int = 128):
    def wrapper_cache(func):
        func = lru_cache(maxsize=maxsize)(func)
        func.expiration = time() + seconds

        @wraps(func)
        def wrapped_func(*args, **kwargs):
            if time() >= func.expiration:
                func.cache_clear()
                func.expiration = time() + seconds

            return func(*args, **kwargs)

        return wrapped_func

    return wrapper_cache


# Decorated Function
@timed_lru_cache(1)
def slow_function(number: int) -> int:
    sleep(5)
    return number


# Main Function
star_time = time()
result = slow_function(5)
end_time = time()

print("Second execution: result: {} | time: {}".format(result, end_time - star_time))

star_time = time()
result = slow_function(5)
end_time = time()

print("Second execution: result: {} | time: {}".format(result, end_time - star_time))
```

And that’s it! It is really simple to implement and reuse.

## Important observation

This method only work for functions outside classes, but there is a way to make it work(like [this](https://stackoverflow.com/questions/33672412/python-functools-lru-cache-with-class-methods-release-object) link in Stack Overflow shows). It adds a lot of overhead, so I prefer to just separate the function from the class.

Thank you for reading. I hope this tutorial was useful to you!.

(And thanks to [Mylena Rossato](https://medium.com/u/b4c09758a45?source=post_page---user_mention--4d1fa96f0e95---------------------------------------) for the English review!)

## References

- [https://realpython.com/caching-external-api-requests/](https://realpython.com/caching-external-api-requests/)
- [https://medium.com/fintechexplained/advanced-python-how-to-implement-caching-in-python-application-9d0a4136b845](https://medium.com/fintechexplained/advanced-python-how-to-implement-caching-in-python-application-9d0a4136b845)
- [https://realpython.com/lru-cache-python/](https://realpython.com/lru-cache-python/)
- [https://towardsdatascience.com/why-you-should-wrap-decorators-in-python-5ac3676835f9](https://towardsdatascience.com/why-you-should-wrap-decorators-in-python-5ac3676835f9)
- [https://stackoverflow.com/questions/33672412/python-functools-lru-cache-with-class-methods-release-object](https://stackoverflow.com/questions/33672412/python-functools-lru-cache-with-class-methods-release-object)
- [https://realpython.com/lru-cache-python/#evicting-cache-entries-based-on-both-time-and-space](https://realpython.com/lru-cache-python/#evicting-cache-entries-based-on-both-time-and-space)
- [https://docs.python.org/3/library/functools.html#functools.lru_cache](https://docs.python.org/3/library/functools.html#functools.lru_cache)
- [https://stackoverflow.com/questions/33672412/python-functools-lru-cache-with-class-methods-release-object](https://stackoverflow.com/questions/33672412/python-functools-lru-cache-with-class-methods-release-object)
