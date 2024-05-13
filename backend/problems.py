from pydantic import BaseModel

class Problem(BaseModel):
    problem: str
    answer: str

