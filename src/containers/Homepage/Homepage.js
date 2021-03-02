import React, { Component } from 'react'
import postsMockup from '../../data-mockup/posts-mockup'

import './Homepage.scss'

export default class Homepage extends Component {
    componentDidMount(){
        fetch('https://react-project-d7762-default-rtdb.firebaseio.com/posts.json',{
            method:'PUT',
            body:JSON.stringify(postsMockup.map(el => ({...el,id:el.id-1})))
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
