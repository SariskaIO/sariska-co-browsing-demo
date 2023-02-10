export const getToken = async ({profile, name}) => {
    const body = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey:
          process.env.REACT_APP_API_KEY ||
          "27fd6f9e85c304447d3cc0fb31e7ba8062df58af86ac3f9437",
        user: {
           id: profile.id,
           name: name,
           email: profile.email
        },
        exp: "48 hours",
      }),
    };
  
    try {
      const response = await fetch(
        "https://api.sariska.io/api/v1/misc/generate-token",
        body
      );
      if (response.ok) {
        const json = await response.json();
        localStorage.setItem("SARISKA_TOKEN", json.token);
        return json.token;
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export const randomNameGenerator = (length, small) => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return small ? result.toLowerCase() : result;
  }


export const getModerator = (conference, tracks) => {
  let participants = [...conference?.getParticipantsWithoutHidden(), 
      { 
        _identity: { user: conference?.getLocalUser() },
        _id: conference?.myUserId(), 
        _role: conference?.getRole() 
      }
    ];
  let moderator = participants?.find(participant => participant?._role === 'moderator');
  if(!moderator) return {moderatorId: "", moderatorTrack: null};
  for(const[key, value] of Object.entries(tracks)){
    console.log('keyval', key, value)
    if(key === moderator[0]?._id){
      console.log('hgg', key, value)
      return {moderatorId: key, moderatorTrack: value};
    }
  }
}

export function isMobile() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

export function isSquare  (n) {
  return n > 0 && Math.sqrt(n) % 1 === 0;
};

export function  calculateSteamHeightAndExtraDiff(viewportWidth, viewportHeight, documentWidth)  {
  let videoStreamHeight = viewportHeight, videoStreamDiff = 0;
  if ( viewportWidth > documentWidth) {
      return {videoStreamHeight: documentWidth*9/16, videoStreamDiff: 0};
  }
  if ( viewportHeight * (16 / 9)  < viewportWidth )  {
      let diff = viewportWidth - viewportHeight*16/9;
      videoStreamHeight =  (viewportHeight * 16 / 9 + diff)*9/16;
      videoStreamDiff = viewportHeight * 16 / 9 + diff - viewportWidth;
  } else {
      videoStreamDiff =  viewportHeight * 16 / 9  - viewportWidth;
  }
  return { videoStreamHeight, videoStreamDiff };
}

export function calculateRowsAndColumns(totalParticipant, viewportWidth, viewportHeight) {
  const actualWidth = viewportWidth;
  const  actualHeight = viewportHeight;
  const numWindows = totalParticipant;
  let columns;
  let rows;
  let isAsymmetricView;
  let gridItemWidth, gridItemHeight, offset, lastRowOffset, lastRowWidth;
  
  if (isMobile()) {
      columns  = totalParticipant > 4 ? 2 : 1;
      rows  = Math.ceil(totalParticipant / columns);
      isAsymmetricView = totalParticipant<=8 ? true : false;
      if(totalParticipant > 8){
          gridItemHeight = (viewportHeight - 2*12) / 4;
          gridItemWidth  = viewportWidth - (columns +  1)*12;
      }
  } else if ( viewportWidth * 3 < viewportHeight  )  {
      columns  = 1;
      rows =  viewportWidth / columns;
      isAsymmetricView = true;
  } else if ( viewportWidth >  3 * viewportHeight) {
      rows = 1;
      columns = viewportHeight / rows;
      isAsymmetricView = true;
  } else {
      columns = Math.ceil(Math.sqrt(numWindows));
      rows = Math.ceil(numWindows / columns);
  }

  if (isAsymmetricView) {
      viewportHeight  = viewportHeight - ( rows + 1 )*12;
      viewportWidth  = viewportWidth - (columns +  1)*12;
      console.log('vieprt', viewportWidth, lastRowWidth, gridItemWidth)
      
      gridItemHeight = viewportHeight / rows;
      gridItemWidth = viewportWidth / columns;

      offset  =  0;
      lastRowOffset =  (viewportWidth - ((totalParticipant % (columns + 1)) * gridItemWidth))/2; 
      
      if ( totalParticipant % columns  === 0 ) {
          lastRowOffset = offset;
      }

      return  { 
          rows: rows , 
          columns: columns, 
          gridItemWidth, 
          gridItemHeight,
          offset, 
          lastRowOffset 
      }
  }

  if (totalParticipant === 1) {
      return { 
          rows,
          columns, 
          gridItemWidth: viewportWidth, 
          gridItemHeight: viewportHeight,
      };
  }

  if (totalParticipant === 2) {
      viewportWidth = viewportWidth - 36;
      gridItemWidth  = viewportWidth / (rows + 1);
      return { 
          rows, 
          columns, 
          gridItemWidth, 
          gridItemHeight: gridItemWidth * 9/16, 
          offset: 12 , 
          lastRowWidth: gridItemWidth,
          lastRowOffset: 12
      };
  }

  if (isSquare(totalParticipant) || totalParticipant <= 4) {
      viewportHeight  = viewportHeight - (columns - 1)*12;
      viewportWidth = viewportWidth - (columns - 1)*12;;
      gridItemHeight  =  viewportHeight / rows;
      gridItemWidth = gridItemHeight * 16/9;
      offset  =  (viewportWidth -  (columns * gridItemWidth))/2;  
      const lastRowParticipantCount = (totalParticipant % columns === 0 ? columns: totalParticipant % columns );
      lastRowOffset =  (actualWidth  - (lastRowParticipantCount * gridItemWidth) - (lastRowParticipantCount - 1)*12 )/2;

      return { 
          rows, 
          columns, 
          gridItemWidth, 
          gridItemHeight, 
          offset, 
          lastRowOffset,
          lastRowWidth: gridItemWidth
      }
  } else if ( rows < columns ) {
      viewportHeight  = viewportHeight - ( rows - 1 )*12;
      viewportWidth  = viewportWidth - (columns +  1)*12;
      gridItemWidth =  viewportWidth / (rows + 1);
      gridItemHeight =  viewportHeight / (columns - 1);
      lastRowWidth = gridItemHeight  *   16/9;
      offset  =  (viewportWidth -  (columns * gridItemWidth))/2 || 12;
      if ( totalParticipant % columns === 0  || (totalParticipant % columns) * gridItemHeight * 16/9  >  actualWidth) {
          lastRowWidth = gridItemWidth;
      }
      const lastRowParticipantCount = totalParticipant % columns === 0 ? columns :  totalParticipant % columns;
      lastRowOffset =  (actualWidth - (lastRowParticipantCount * lastRowWidth) - (lastRowParticipantCount - 1)*12 )/2 ;

      return { 
          rows, 
          columns, 
          gridItemWidth, 
          gridItemHeight, 
          offset, 
          lastRowOffset,
          lastRowWidth
      };
  }  else if ( rows === columns) {
      rows = rows  - 1;
      columns  = columns + 1;  
      viewportHeight  = viewportHeight - ( rows - 1 ) * 12;
      viewportWidth  = viewportWidth - ( columns +  1 ) * 12;
      
      gridItemHeight = viewportHeight / rows;
      gridItemWidth = viewportWidth / columns;
      offset  =  (viewportWidth -  (columns * gridItemWidth))/2 || 12;  
      lastRowWidth = gridItemHeight  *   16/9;
      if ( totalParticipant % columns === 0  || (totalParticipant % columns) * gridItemHeight * 16/9 >  actualWidth) {
          lastRowWidth = gridItemWidth;
      }
      const lastRowParticipantCount = totalParticipant % columns === 0 ? columns :  totalParticipant % columns;
      lastRowOffset =  (actualWidth - (lastRowParticipantCount * lastRowWidth) - (lastRowParticipantCount - 1)*12 )/2 ;

      return  { 
          rows, 
          columns, 
          gridItemWidth, 
          gridItemHeight, 
          offset,
          lastRowWidth,
          lastRowOffset 
      }
  } else {
      viewportHeight  = viewportHeight - ( rows - 1 ) * 12;
      viewportWidth  = viewportWidth - ( columns +  1 ) * 12;
      
      gridItemHeight = viewportHeight / rows;
      gridItemWidth = viewportWidth / columns;

      offset  =  (viewportWidth -  (columns* gridItemWidth))/2 || 12;  
      lastRowWidth = gridItemHeight  *   16/9;
      if ( totalParticipant % columns === 0  || (totalParticipant % columns) * gridItemHeight * 16/9 >  actualWidth) {
          lastRowWidth = gridItemWidth;
      }
      const lastRowParticipantCount = totalParticipant % columns === 0 ? columns :  totalParticipant % columns;
      lastRowOffset =  (actualWidth - lastRowParticipantCount * lastRowWidth - (lastRowParticipantCount - 1)*12 )/2 ;

      return  { 
          rows, 
          columns, 
          gridItemWidth, 
          gridItemHeight, 
          offset,
          lastRowWidth,
          lastRowOffset 
      }
  }
} 

export function getLeftTop(i,  j,  gridItemWidth, gridItemHeight, offset, lastRowOffset, rows, participantCount, viewportHeight, lastRowWidth, documentHeight){
  let left, top; 
  if ( (rows - 1 ) === i) {
     left  = lastRowOffset + (j * lastRowWidth) + j*12;
  } else {
     left  = offset + (j * gridItemWidth) +  j*12
  }
  top  =   (i *  gridItemHeight + i*12);
  if ( participantCount === 2 ) {
      return { left, top: (documentHeight - gridItemHeight) / 2};
  }
  return { left, top };
}