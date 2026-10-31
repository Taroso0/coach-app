import { Center, Loader } from '@mantine/core'

export default function LoadingState() {
  return (
    <Center py="xl">
      <Loader aria-label="Загрузка" />
    </Center>
  )
}
