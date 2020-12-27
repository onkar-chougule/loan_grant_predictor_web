from  flask import Flask,jsonify,request
import numpy as np
import pandas as pd
import json
import pickle

__model=None
__standard=None
__minmax=None
__col=None
# import util
app=Flask(__name__)

@app.route('/get_graduation_status',methods=['GET','POST'])
def get_graduation_status():
    graduation_status=float(request.form['graduation_Status'])
    response=jsonify({
        'status_into_10':graduation_status*10
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/get_result',methods=['GET','POST'])
def get_result():
    gender=int(request.form['gender'])
    self_employed=int(request.form['self_employed'])
    credit_history=int(request.form['credit_history'])
    married=int(request.form['married'])
    dependents=int(request.form['dependents'])
    education=int(request.form['education'])
    applicantincome=float(request.form['applicantincome'])
    coapplicantincome=float(request.form['coapplicantincome'])
    loanammount=float(request.form['loanammount'])
    loan_ammount_term=float(request.form['loan_ammount_term'])
    property_area=int(request.form['property_area'])

    x=np.zeros(13)
    x[0]=gender
    x[1]=self_employed
    x[2]=credit_history
    x[3]=married
    x[4]=dependents
    x[5]=education
    x[6]=applicantincome
    x[7]=coapplicantincome
    x[8]=loanammount
    x[9]=loan_ammount_term
    if property_area>=0:
        x[property_area]=1


    x=x.reshape(1,13)
    df=pd.DataFrame(x)
    df.columns=__col['data_columns']
    df[['applicantincome','coapplicantincome','loan_amount_term']]=__minmax.transform(df[['applicantincome','coapplicantincome','loan_amount_term']])
    df[['loanamount']]=__standard.transform(df[['loanamount']])
    res=__model.predict(df)
    res=res[0]
    
    if(res==0):
        result="Sorry, this loan can't be processed"
    else:
        result="Congratulations!, Your loan can be processed"
    
    response=jsonify({
        'result':result
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


def load_saved_funcs():
    global __model
    if __model is None:
        with open('./funcs/log_reg_mod.pickle','rb') as f:
            __model=pickle.load(f)

    global __standard
    global __minmax
    with open('./funcs/StdScaler.pickle','rb') as f:
        __standard=pickle.load(f)
    with open('./funcs/MMScaler.pickle','rb') as f:
        __minmax=pickle.load(f)

    global __col
    f=open('./funcs/columns.json')
    __col=json.load(f)

if __name__ == '__main__':
    load_saved_funcs()
    app.run(debug=True)
