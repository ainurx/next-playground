import React, { Component, createRef } from 'react'

import {map} from 'lodash'
import { Container } from '@mui/material';
import Masonry from '@mui/lab/Masonry';

import Card from '@/components/Card'

class Post extends Component{
  constructor(props){
    super(props)
    this.state = {
      items: [],
      isLoading: false,
      page: 1
    }

    this.masonryRef = createRef()
    this.cardRef = []
    
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount(){
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.isLoading !== this.state.isLoading){
      this.masonryRef.current.addEventListener('scroll', this.handleScroll)
      return () => this.masonryRef.current.removeEventListener('scroll', this.handleScroll)
    }
    if(prevState.items !== this.state.items){
      console.log('new items loaded ....')
    }
  }

  async fetchData(){
    try{
      this.setState({ isLoading: true })

      const result = await fetch(`https://rickandmortyapi.com/api/character/?page=${this.state.page}`)
      const data = await result.json()
      // console.log(data.results)

      this.setState(prevState => ({ items: [...prevState.items, ...data.results], page: prevState.page+=1 }))
    } catch(err){
      console.log(err)
    } finally{
      this.setState({ isLoading: false })
    }
  }

  isInMasonry(comp, index){
    const mWidth = this.masonryRef.current.getBoundingClientRect().width
    const mHeight = this.masonryRef.current.getBoundingClientRect().height
    if(index === 0){
      console.log(`=== MASONRY height & width [${index}] ===`)
      console.log(`width: ${mWidth}`)
      console.log(`height: ${mHeight}`)
      console.log(comp)
    } 

    if(index % 2 === 0){
      if(comp.top <= 94 && comp.top >= 24 && comp.bottom <= mHeight ){
        console.log(`comp[${index}].componentTop => ${Math.round(comp.top)}`)
        this.cardRef[index].style.backgroundColor = 'red'
        return true
      } else {
        this.cardRef[index].style.backgroundColor = 'white'
        return false
      }
    } else {
      if(comp.top <= 23 && comp.top >= -120 && comp.bottom <= mHeight ){
        // console.log(`comp[${index}].componentTop => ${Math.round(comp.top)}`)
        this.cardRef[index].style.backgroundColor = 'red'
        return true
      } else {
        this.cardRef[index].style.backgroundColor = 'white'
        return false
      }
    }
  }

  handleScroll(){
    // const { documentElement } = document
    console.log('handleScroll....')
    // console.log(this.cardRef[0].getBoundingClientRect())
    map(this.cardRef, (card, index)=>{
      if(this.isInMasonry(card.getBoundingClientRect(), index)){
        // console.log(`card[${index}] is inside view`)
        // if(card.getBoundingClientRect().top <= 90 && card.getBoundingClientRect().top >= 2){
        //   // card.style.backgroundColor = 'red'
        // } else {
        //   card.style.backgroundColor = 'white'
        // }
        console.log(`top[${index}] => ${card.getBoundingClientRect().top}`)
      }
      // console.log(card.getBoundingClientRect())
    })

    if(Math.round(this.masonryRef.current.scrollTop + this.masonryRef.current.offsetHeight) !== this.masonryRef.current.scrollHeight || this.refreshing){

      return
    }
    this.fetchData()
  }

  setRef = (index) => (ref) => {
    this.cardRef[index] = ref
  }

  render(){
    return(
      <Container style={{ justifyContent: 'center', display: 'flex'}}>
        <div style={{ display: 'block', backgroundColor: '#F5F5F5'}}>
          <h1>Post</h1>
          <div ref={this.masonryRef} style={{ width: '700px', overflowX: 'hidden', overflowY: 'scroll', height: 480}}>
            <Masonry columns={2} spacing={2} style ={{ margin: 0 }}>
              {
                this.state.items.map((item, index)=>(
                  <Card
                    index={index}
                    ref={this.setRef(index)}
                    key={`item-${item.charId}-${index}`}
                    charId={item.charId}
                    profile={item.image}
                    name={item.name}
                    species={item.species}
                    location={item.location.name}
                  />
                ))
              }
            </Masonry>
          </div>
        </div>
      </Container>
    )
  }
}

export default Post