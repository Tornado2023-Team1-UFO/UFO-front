import { FC } from 'react'

type Props = {
  targetUser: string
  onChangeTargetUser: (targetUser: string) => void
  onClickNext: () => void
}

export const TargetUser: FC<Props> = ({ targetUser, onChangeTargetUser, onClickNext }) => (
  <div>
    たいしょうのユーザー
    <input
      style={{
        backgroundColor: 'white',
      }}
      type='text'
      value={targetUser}
      onChange={(e) => onChangeTargetUser(e.target.value)}
    />
    <button onClick={() => onClickNext()}>次へ</button>
  </div>
)
