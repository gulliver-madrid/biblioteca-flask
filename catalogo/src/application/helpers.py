def to_ints(string: str) -> list[int] | None:
    """
    Convierte la cadena de digitos separados por comas en una lista de enteros. Devuelve None si la cadena introducida no es valida
    """
    if any(not s.isdigit() and s != "," for s in string):
        return None
    if not string:
        return []
    splitted = string.split(",")
    if any(s == "" for s in splitted):
        return None
    return [int(s) for s in splitted]
