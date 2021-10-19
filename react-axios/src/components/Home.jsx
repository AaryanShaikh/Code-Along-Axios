import React, { Component } from 'react'
import axios from "axios"
import './Home.css';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            datas: [],
            name: "",
            job: "",
            put_id: "",
            new_name: "",
            new_job: "",
            del_id: ""
        }
    }

    componentDidMount() {
        axios.get("https://reqres.in/api/users?")
            .then((res) => {
                console.log(res);
                this.setState({
                    datas: res.data.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onJobChange = (e) => {
        this.setState({
            job: e.target.value
        })
    }

    onPutIdChange = (e) => {
        this.setState({
            put_id: e.target.value
        })
    }

    onDelIdChange = (e) => {
        this.setState({
            del_id: e.target.value
        })
    }

    onPutNameChange = (e) => {
        this.setState({
            new_name: e.target.value
        })
    }

    onPutJobChange = (e) => {
        this.setState({
            new_job: e.target.value
        })
    }

    onSubmit = (e) => {
        let user = {
            name: this.state.name,
            job: this.state.job,
        }
        axios.post("https://reqres.in/api/users/", { user })
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        e.preventDefault()
    }

    onSubmitPut = (e) => {
        let user = {
            name: this.state.new_name,
            job: this.state.new_job,
        }
        axios.put(`https://reqres.in/api/users/${this.state.put_id}`, { user })
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        e.preventDefault()
    }

    onSubmitDel = (e) => {
        axios.delete(`https://reqres.in/api/users/${this.state.put_id}`)
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        e.preventDefault()
    }

    render() {
        return (
            <>
                <div className="home">
                    {(this.state.datas.length > 0) ?
                        this.state.datas.map((person) => {
                            return <div key={person.id}>
                                <img src={person.avatar} alt="" />
                                <p>Name: {person.first_name} {person.last_name}</p>
                                <p>Email: {person.email}</p>
                            </div>
                        })
                        :
                        <p>No Data Found</p>
                    }
                </div>
                <div>
                    <h2>Using Post method</h2>
                    <form onSubmit={this.onSubmit}>
                        Name: <input type="text" onChange={this.onNameChange} />
                        Job: <input type="text" onChange={this.onJobChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div>
                    <h2>Using Put(update) method</h2>
                    <form onSubmit={this.onSubmitPut}>
                        ID: <input type="number" onChange={this.onPutIdChange} />
                        Name: <input type="text" onChange={this.onPutNameChange} />
                        Job: <input type="text" onChange={this.onPutJobChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div>
                    <h2>Using Delete method</h2>
                    <form onSubmit={this.onSubmitDel}>
                        ID: <input type="number" onChange={this.onDelIdChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </>
        )
    }
}
