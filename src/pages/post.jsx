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
      // console.log('=> Data ...')
      const data = await result.json()
      // console.log(data.results)

      this.setState(prevState => ({ items: [...prevState.items, ...data.results], page: prevState.page+=1 }))
    } catch(err){
      console.log(err)
    } finally{
      this.setState({ isLoading: false })
    }
  }

  isInMasonry(comp){
    const mWidth = this.masonryRef.current.getBoundingClientRect().width
    const mHeight = this.masonryRef.current.getBoundingClientRect().height
    // console.log('=== MASONRY height & width ===')
    // console.log(`width: ${mWidth}`)
    // console.log(`height: ${mHeight}`)

    if(comp.top >= 0 && comp.left >= 0 && comp.bottom <= mHeight && comp.right <= mWidth ){
      return true
    } else {
      return false
    }
  }

  handleScroll(){
    const { documentElement } = document
    map(this.cardRef, (card, index)=>{
      console.log(index)
      console.log(this.isInMasonry(card.getBoundingClientRect()))
      // console.log(card.getBoundingClientRect())
    })
    console.log(this.cardRef)

    // const cardProps = this.cardRef.current.getProps()
    // const card = this.cardRef.current.getCurrent()

    // console.log(cardProps.name)
    // console.log(card.getBoundingClientRect())
    if(this.masonryRef.current.innerHeight + documentElement.scrollTop !== documentElement.offsetHeight || this.state.isLoading){
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
          <div style={{ width: '700px', overflowX: 'hidden', overflowY: 'scroll', height: 480}}>
            <Masonry ref={this.masonryRef} columns={2} spacing={2} style ={{ margin: 0 }}>
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