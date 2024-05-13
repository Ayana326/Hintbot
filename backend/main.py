from typing import Dict
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from users import User
from problems import Problem
from executer import Executer

app = FastAPI()

problems = {
    0: Problem(
        problem="""1と出力してください""",
        answer="1",
    ),
    1: Problem(
        problem="""hogeと出力してください""",
        answer="hoge",
    ),
}
executer=Executer()

class AnswerProblemRes(BaseModel):
    is_correct: bool
    message: str

@app.get("/problems")
async def get_problems()->Dict[int,Problem]:
    """idとproblemを返す"""
    return problems

@app.get("/problem")
async def get_problem(problem_id: int)->Problem:
    if problem_id not in problems.keys():
        return HTTPException(status_code=400, detail=f"problem id {problem_id} not found. please select valid problem_id")
    else:
        return problems[problem_id]
    
@app.post("/answer-problem")
async def answer_validate(problem_id:int, answer: str, user: User)->AnswerProblemRes:
    if not user.is_valid():
        return HTTPException(status_code=401, detail="Unauthorized: invalid user")
    if problem_id not in problems.keys():
        return HTTPException(status_code=400, detail=f"problem id {problem_id} not found. please select valid problem_id")
    problem=problems[problem_id]
    answer = executer.execute(problem=problem.problem,lang="python")
    if answer==problem.answer:
        return AnswerProblemRes(is_correct=True,message="正解だぜい")
    else:
        return AnswerProblemRes(is_correct=False,message="不正解です。(TODO: ヒントメッセージを追加)")

