import React from 'react'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Item = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--gray3);
`
const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`

const Description = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`

const DescriptionText = styled.p`
  font-size: 1.6rem;
  margin: 1rem 0 0 0;
  color: #888;
`

const Comments = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    border: 1px solid var(--gray3);
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }

  img {
    width: 2rem;
    margin-right: 2rem;
  }

  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;

    &:last-of-type {
      margin: 0;
    }
  }
`

const Image = styled.img`
  width: 200px;
`

const Votes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid var(--gray3);
  padding: 1rem 3rem;

  div {
    font-size: 2rem;
  }

  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`

const Product = ({ product }) => {
  const {
    id,
    comments,
    created,
    description,
    company,
    name,
    url,
    imageUrl,
    votes
  } = product

  return (
    <Item>
      <Description>
        <div>
          <Image src={imageUrl} alt={name} />
        </div>
        <div>
          <Title>{name}</Title>
          <DescriptionText>{description}</DescriptionText>

          <Comments>
            <div>
              <img src="/static/img/comment.png" alt="comment-image" />
              <p>{comments.length} comments</p>
            </div>
          </Comments>

          <p>Publicated {formatDistanceToNow(new Date(created))} ago</p>
        </div>
      </Description>

      <Votes>
        <div>&#9650;</div>
        <p>{votes}</p>
      </Votes>
    </Item>
  )
}

export default Product
