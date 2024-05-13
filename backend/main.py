from typing import Dict
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from users import User
from problems import Problem
from executers import Executer
from bots import HintBot

app = FastAPI()
executer=Executer()
hint_bot = HintBot()

problems = {
    "0": Problem(
        problem="""1と出力してください""",
        answer="1",
    ),
    "1": Problem(
        problem="""hogeと出力してください""",
        answer="hoge",
    ),
}

@app.get("/problems")
async def get_problems()->Dict[str,Problem]:
    """idとproblemを返す"""
    return problems

@app.get("/problem")
async def get_problem(problem_id:str)->Problem:
    if problem_id not in problems.keys():
        raise HTTPException(status_code=400, detail=f"problem id \"{problem_id}\" not found. please select valid problem_id")
    else:
        return problems[problem_id]
    
class AnswerProblemRes(BaseModel):
    is_correct: bool
    message: str
class AnswerProblemReq(BaseModel):
    problem_id:str
    answer: str
    user: User

@app.post("/problem/answer")
async def answer_problem(req:AnswerProblemReq)->AnswerProblemRes:
    if not req.user.is_valid():
        raise HTTPException(status_code=401, detail="Unauthorized: invalid user")
    if req.problem_id not in problems.keys():
        raise HTTPException(status_code=400, detail=f"problem id \"{req.problem_id}\" not found. please select valid problem_id")
    problem=problems[req.problem_id]
    answer = executer.execute(problem=problem.problem,lang="python")
    if answer==problem.answer:
        return AnswerProblemRes(is_correct=True,message="正解だぜい")
    else:
        return AnswerProblemRes(is_correct=False,message="不正解です。(TODO: ヒントメッセージを追加)")

class HintAskReq(BaseModel):
    problem_id:str 
    question:str
    user:User

@app.post("/hint/ask")
async def answer_problem(req:HintAskReq)->str:
    """
    HintBotに質問をする
    """
    if not req.user.is_valid():
        raise HTTPException(status_code=401, detail="Unauthorized: invalid user")
    if req.problem_id not in problems.keys():
        raise HTTPException(status_code=400, detail=f"problem id \"{req.problem_id}\" not found. please select valid problem_id")
    problem=problems[req.problem_id]
    hint = hint_bot.ask(problem=problem,question=req.question)
    return hint
