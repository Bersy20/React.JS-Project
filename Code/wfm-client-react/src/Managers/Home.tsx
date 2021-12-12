import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import selectors from '../Redux/selectors';
import operations from '../Redux/operations';
import '../Managers/Home.css';
import 'antd/dist/antd.css';
import { Modal, message } from 'antd';
import home from '../assets/back.png'


const ManagerHome = ({ }: any) => {

    const dispatch = useDispatch();
    const getEmpForManager = operations.dispatchgetEmpForManager(dispatch);
    const insertEmpStatusToSoftLock = operations.dispatchInsertEmpStatusToSoftLock(dispatch)

    const [empId, setEmpId] = useState('');
    const [ok, setOk] = useState(false);
    const [reqMessage, setReqMessage] = useState('');
    const [empDetails, setEmpDetails] = useState({ employee_id: '', requestmessage: '', manager: '' });


    const {
        empForManagerState,
    } = useSelector(
        state => ({
            empForManagerState: selectors.empForManager(state),
        }));

    useEffect(() => {
        document.body.style.backgroundColor = "LightBlue"
        getEmpForManager()
    }, []);

    useEffect(() => {
        if (empDetails.employee_id) {
            Modal.confirm({
                title: 'SoftLock Request Confirmation',
                width: 600,
                content: (
                    <div>
                        <br />
                        <div id={"rightdiv"}>
                            <form>
                                <div style={{ padding: "0px 30px 0px 0px", width: "100%" }}>
                                    <label>Please confirm the lock request for</label><br></br>
                                    <input type='text' id={'employee_id'} name="employee_id" value={empDetails.employee_id} onChange={(x: any) => setEmpId(x.target.value)} readOnly /><br></br>
                                </div>
                                <br />
                                <label>Request Message (Message must be atleast 10 characters long)</label><br /><br />
                                <textarea id="message" name="message" style={{ width: "94%" }} onChange={(x: any) => setReqMessage(x.target.value)} ></textarea>
                                <br />
                            </form>
                        </div>
                    </div>
                ),
                okText: 'Send',
                cancelText: 'Cancel',
                onOk() {
                    setOk(true);
                    message.success('The Request is sucessfully sent for Approval', 2);
                },
                onCancel() { setEmpDetails({ employee_id: '', requestmessage: '', manager: '' }) }
            });
        }
    }, [empDetails])

    const getEmployeeById = (id: any) => {
        const empDetailsId = Object.keys(empForManagerState).filter((x: any) => empForManagerState[x].employee_id == id);
        const empDetailsById = empForManagerState[empDetailsId[0]];
        setEmpDetails(empDetailsById);
    }

    useEffect(() => {
        if (ok) {
            insertEmpStatusToSoftLock(empDetails.employee_id, empDetails.manager, reqMessage);
            const empDetailsList = Object.keys(empForManagerState).filter((x: any) =>
                empForManagerState[x].employee_id == empDetails.employee_id
            );
            empForManagerState.splice(empDetailsList[0], 1)
            setReqMessage('');
            setOk(false);
        }
    }, [ok])

    return (
        <div>
         {/* <button onClick={()=>{
             localStorage.clear();         
         }}>Log out</button> */}
            <div id="topic">
                <img src={home} />
                <h1 style={{ padding: "70px 40px 40px 40px", width: "100%", fontSize: "40px" }}>
                    Welcome To Work Force Management Portal - Manager
                </h1>
            </div>
            <br /><br />
            <table id='myTable'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        {/* <th>Status</th> */}
                        <th>Skill Set</th>
                        <th>Profile</th>
                        <th>Manager</th>
                        <th>WFM Manager</th>
                        {/* <th>Email</th> */}
                        {/* <th>Lock Status</th> */}
                        <th>Experience</th>
                        <th>Approval</th>
                    </tr>
                </thead>
                <tbody >
                    {Object.keys(empForManagerState).map((x: any) => {

                        let skillSet = [];
                        let ss = empForManagerState[x].SkillSet.split(",");
                        skillSet.push(ss)
                        let skills = skillSet[0]

                        return (
                            <tr key={empForManagerState[x].employee_id} >
                                <td style={{ fontWeight: 'bold' }}>{empForManagerState[x].employee_id}</td>
                                <td>{empForManagerState[x].name}</td>
                                {/* <td>{empForManagerState[x].status}</td> */}
                                <td>{
                                    skills.map((s: any) => {
                                        return (
                                            <button style={{ color: "#203e6bde", cursor: 'auto', backgroundColor: '#B7B3B7', margin: '4px', fontWeight: 'bold' }}>{s}</button>
                                        )
                                    })
                                }</td>
                                <td>{empForManagerState[x].profile_id}</td>
                                <td>{empForManagerState[x].manager}</td>
                                <td>{empForManagerState[x].wfm_manager}</td>
                                {/* <td>{empForManagerState[x].email}</td> */}
                                {/* <td>{empForManagerState[x].lockstatus}</td> */}
                                <td>{empForManagerState[x].experience} years</td>
                                <td><button id='btn' onClick={() => { getEmployeeById(empForManagerState[x].employee_id) }}>
                                    Request Lock</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default ManagerHome