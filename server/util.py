import pickle
import json
import numpy as np

__trial=None
def get_graduation_status(graduation_status):
    global __trial
    __trial=graduation_status
    return __trial*10
