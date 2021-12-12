
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import selectors from '../Redux/selectors';
import operations from '../Redux/operations';
import '../Managers/Home.css';
import 'antd/dist/antd.css';
import { Modal, message} from 'antd';
import home from '../assets/back.png'

const WFMHome = ({}: any) => {

    const dispatch = useDispatch();
    const getEmpForWfmMember = operations.dispatchgetEmpForWfmMember(dispatch);
    const getEmpFromSoftLock = operations.dispatchgetEmpFromSoftLock(dispatch)
    const updateEmpStatusFromSoftLock = operations.dispatchUpdateEmpFromSoftLock(dispatch)
    const [empId, setEmpId] = useState('');
    const [empManager, setEmpManager] = useState('');
    const [requestee, setRequestee] = useState('');
    const [reqDes, setReqDes] = useState('');
    const [status, setStatus] = useState('');
    const [ok, setOk] = useState(false);

    const {
        empForWfmMemberState,
        empFromSoftLockState
    } = useSelector(
        state => ({
            empForWfmMemberState: selectors.empForWfmMember(state),
            empFromSoftLockState: selectors.empFromSoftLock(state)
        }));
    useEffect(() => {
        document.body.style.backgroundColor = "LightBlue"
        getEmpForWfmMember()
    }, []);

    const updateEmpStatus = (empId: any, status: any) => {
        updateEmpStatusFromSoftLock(empId, status);
    }

    useEffect(() => {
        if (ok) {
            updateEmpStatus(empFromSoftLockState[0].employee_id, status);
            const empDetailsList = Object.keys(empForWfmMemberState).filter((x: any) =>
                empForWfmMemberState[x].employee_id == empFromSoftLockState[0].employee_id
            );
            empForWfmMemberState.splice(empDetailsList[0], 1)
            setOk(false);
        }
    }, [ok])

    useEffect(() => {
        if (empFromSoftLockState) {
            Modal.confirm({
                title: 'SoftLock Request Confirmation',
                width: 600,
                content: (
                    <div>
                        <br />
                        <div>
                            <form>
                                <div>
                                    <div style={{ padding: "0px 30px 0px 0px", width: "100%" }}>
                                        <label>Employee Id:</label><br></br>
                                        <input type='text' id={'employee_id'} name="employee_id" value={empFromSoftLockState[0].employee_id} readOnly onChange={(x: any) => setEmpId(x.target.value)} /><br></br>
                                        <label>Employee Manager:</label><br />
                                        <input type="text" id="manager" name="manager" value={empFromSoftLockState[0].manager} readOnly onChange={(x: any) => setEmpManager(x.target.value)} /><br />
                                    </div>
                                    <div style={{ padding: "0px 30px 0px 0px", width: "100%" }}>
                                        <label>Requestee:</label><br />
                                        <input type="text" id="email" name="email" value={empFromSoftLockState[0].manager} readOnly onChange={(x: any) => setRequestee(x.target.value)} /><br />
                                        <label>Request Description:</label><br />
                                        <input type="text" id="reqdate" name="reqdate" value={empFromSoftLockState[0].requestmessage} readOnly onChange={(x: any) => setReqDes(x.target.value)} /><br />
                                    </div>
                                </div>
                                <label>Status:</label><br /><br/>
                                <select id="status" name="status" style={{ width: "94%" }} onChange={(x: any) => setStatus(x.target.value)}>
                                    <option value="">Please Select</option>
                                    <option value="Approve">Approve</option>
                                    <option value="Decline">Decline</option>
                                </select><br />
                            </form>
                        </div>

                    </div>

                ),
                okText: 'Send',
                cancelText: 'Cancel',
                onOk() { 
                    setOk(true) ;
                    message.success('The Request is Updated', 2);
                },
                onCancel() { }
            });
        }
    }, [empFromSoftLockState])

    const getEmployeeById = (id: any) => {
        getEmpFromSoftLock(id)
    }

    return (
        <div>
            <div id="topic">
                <img src={home} />
                <h1 style={{ padding: "60px 40px 40px 40px", width: "100%", fontSize: "40px" }}>Welcome To Work Force Management Portal - WFM Member</h1>
            </div>
            <br /><br />
            <table id='myTable'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        {/* <th>Status</th> */}
                        <th>Manager</th>
                        <th>WFM Member</th>
                        {/* <th>Email</th> */}
                        {/* <th>Lock Status</th> */}
                        <th>Profile</th>
                        <th>Experience</th>
                        <th>Approval Details</th>
                    </tr>
                </thead>
                <tbody >
                    {Object.keys(empForWfmMemberState).map((x: any) => {
                        return (
                            <tr key={empForWfmMemberState[x].employee_id} >
                                <td style={{fontWeight:'bold'}}>{empForWfmMemberState[x].employee_id}</td>
                                <td>{empForWfmMemberState[x].name}</td>
                                {/* <td>{empForWfmMemberState[x].status}</td> */}
                                <td>{empForWfmMemberState[x].manager}</td>
                                <td>{empForWfmMemberState[x].wfm_manager}</td>
                                {/* <td>{empForWfmMemberState[x].email}</td> */}
                                {/* <td>{empForWfmMemberState[x].lockstatus}</td> */}
                                <td>{empForWfmMemberState[x].profile_id}</td>
                                <td>{empForWfmMemberState[x].experience} years</td>
                                <td><button id='btn' onClick={() => { getEmployeeById(empForWfmMemberState[x].employee_id) }} value={empForWfmMemberState[x].employee_id}><i className="bi bi-lock"></i>View Details</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default WFMHome