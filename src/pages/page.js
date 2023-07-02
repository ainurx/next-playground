import { useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from 'react-query'

import Card from '@/components/Card'


export default function Page(){
  
  const {data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infiniteCharacters", async({ pageParam = 1 }) =>
      await fetch(`https://rickandmortyapi.com/api/character/?page=${pageParam}`)
        .then(res => {
          console.log(`Fetch character data`)
          return res.json()
        }),
    {
      getNextPageParam: (lastPage, pages) => {
        if(lastPage.info.next){
          return pages.length + 1
        }
      }
    }
  )

  return (
    <>
      {
        status === 'success' && (
          <InfiniteScroll
            dataLength={data?.pages.length * 20}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<h4>...Loading</h4>}
          >
            {
              data?.pages.map(page=>(
                <>
                  {
                    page.results.map(char=>(
                      <Card
                        charId={char.charId}
                        profile={char.image}
                        name={char.name}
                        species={char.species}
                        location={char.location.name}
                      />
                    ))
                  }
                </>
              ))
            }
          </InfiniteScroll>
        )
      }
    </>
  )
}