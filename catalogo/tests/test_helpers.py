from src.application.helpers import to_ints


def test_to_ints() -> None:
    assert to_ints("") == []
    assert to_ints("1") == [1]
    assert to_ints("1,2") == [1, 2]
    assert to_ints("no_valido") == None
    assert to_ints(",") == None
