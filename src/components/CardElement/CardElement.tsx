import React, { memo } from 'react'
import cn from 'clsx'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Typography
} from '@mui/material'
import { useDispatch } from 'react-redux'
import s from './CardElement.module.scss'
import { InTicket } from '../../interfaces/Interfaces'
import { pictureRemove } from '../../reducers/tickets'

export type Props = {
  className?: string
  element: InTicket
}

export const CardElement = memo<Props>(({ className, element }) => {
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  const { albumId, id, title, url, thumbnailUrl } = element

  const removeElement = (forRemove: InTicket): void => {
    dispatch(pictureRemove(forRemove))
  }

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    width: '600px',
    height: '600px',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  return (
    <>
      <Card className={cn(s.root, className)}>
        <Button onClick={handleOpen}>
          <CardMedia
            component="img"
            height="140"
            image={thumbnailUrl}
            alt={title}
            className={s.header}
          />
        </Button>
        <CardContent className={s.content}>
          <Typography variant="body2" color="text.secondary">
            Album ID: {albumId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Picture ID: {id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Title: {title}
          </Typography>
        </CardContent>
        <CardActions className={s.footer}>
          <Button
            size="small"
            onClick={() => removeElement(element)}
            className={s.removeBtn}
          >
            REMOVE CARD
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <CardMedia
            component="img"
            height="140"
            image={url}
            alt={title}
            className={s.bigImg}
          />
        </Box>
      </Modal>
    </>
  )
})
