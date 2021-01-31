def maybe_pop(dct, field, default):
    return dct.pop(field) if field in dct else default