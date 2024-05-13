class Executer:
    """
    プログラムを実行して答えを返すクラス
    """
    def execute(self,problem: str, lang:str="python") -> str:
        """
        プログラムを実行して答えを返す
        """
        #TODO
        try:
            answer=self.__execute(problem,lang)
        except Exception as e:
            answer=str(e)
        return answer

    def __execute(self,problem: str, lang:str="python") -> str:
        """
        プログラムを実行して答えを返す
        """
        raise NotImplementedError()
