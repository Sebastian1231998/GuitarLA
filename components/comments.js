import React from "react";
import CommentGuitar from "./commentGuitar";
const Comments = ({url, id, comments, guitarra}) => {


  return (
    <div className="contenedor">
  

      <CommentGuitar 

        urlGuitarra = {url}
        idGuitarra={id}
        commentsGuitarra={comments}
        guitarra={guitarra}
      />
    </div>
  );
};

export default Comments;
