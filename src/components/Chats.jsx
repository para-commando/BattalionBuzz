import React from 'react';
import informationIcon from '../assets/information.png';
import videoCameraIcon from '../assets/videoCamera.png';
import avatarIcon from '../assets/avatarIcon.png';
import phoneCallIcon from '../assets/phoneCall.png';
import sendIntelIcon from '../assets/fighterJet.png';
import emojisIcon from '../assets/fires.png';

function Chats() {
  return (
    <div className='border-r-2 w-[650px] px-5 '>
      <div className='flex justify-between border-b-2 pb-4'>
        <div className='UserInfoInChatsWindow flex items-center gap-3'>
          <img
            src={avatarIcon}
            className='w-14 h-14 mx-2  rounded-full cursor-pointer'
            alt=''
          />
          <div className='name flex flex-col justify-start items-start'>
            <h2 className='font-bold text-xl'>Major Videep</h2>
            <p>Jai Hind</p>
          </div>
        </div>

        <div className='icons flex items-center'>
          <img
            src={phoneCallIcon}
            className='w-7 h-7 mx-2 cursor-pointer '
            alt=''
          />
          <img
            src={informationIcon}
            className='w-7 h-7 mx-2 cursor-pointer '
            alt=''
          />
          <img
            src={videoCameraIcon}
            className='w-7 h-7 mx-2 cursor-pointer '
            alt=''
          />
        </div>
      </div>
      <div className='UserChatDetailsInChatsWindow'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad vitae illo eveniet ratione tempora, pariatur debitis. Enim doloribus eum, nihil dolor nulla veritatis. Nobis, error ipsam sint numquam earum ea iure cum ut quisquam accusantium odit ab unde repudiandae dignissimos officia placeat dolorum odio tempore. Deserunt animi ullam omnis fuga temporibus totam aut atque, delectus itaque accusamus porro ea dolorum. Ratione blanditiis placeat ducimus eligendi fugiat odio molestias ut, dolore natus quibusdam nisi fugit nulla maiores provident necessitatibus facilis ex commodi vero nemo tenetur recusandae. Odit dolorem dolorum, laudantium eius, sint exercitationem veniam, eaque unde fugit placeat voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet tenetur, iure, sapiente deserunt nisi exercitationem incidunt itaque minima eius est autem debitis nihil optio quaerat, id suscipit porro ex qui quos ad odit doloribus? Eius at consequatur voluptates labore iure nihil? Aperiam suscipit quis accusantium sint aliquam dicta deleniti delectus a sed architecto. Sit, mollitia sed eius laboriosam earum culpa quam praesentium harum est neque omnis tenetur dolorem exercitationem magni ipsa veniam modi explicabo odio qui? Deserunt molestias excepturi qui, nulla reiciendis rem accusamus explicabo voluptas vero non provident, fuga odio nihil quis facere consectetur quia molestiae voluptatem vel!
      </div>
      <div className='UserInputInChatsWindow flex'>
        <div className='icons'></div>
        <input
          type='text'
          className='w-[80%] rounded-full pl-4 text-black'
          placeholder='Your Intel goes here...'
        />
        <div title='Emoji' className='emoji'>
          <img
            src={emojisIcon}
            className='w-9 h-9 mx-2 cursor-pointer '
            alt=''
          />
        </div>
        <div title='Send Intel' className='SendButton'>
          <img
            src={sendIntelIcon}
            className='w-9 h-9 mx-2 cursor-pointer '
            alt=''
          />
        </div>
      </div>
    </div>
  );
}

export default Chats;
