from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    token: str|None
    
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": -1,
                    "name": "example user -1",
                    "token": "access token for this user",
                },
                {
                    "id": 0,
                    "name": "example user 0",
                    "token": "access token for this user",
                }
            ]
        }
    }
    
    def is_valid(self)->bool:
        """
        このユーザがvalidかをtokenとidを元に検証する
        """
        #TODO
        return True
