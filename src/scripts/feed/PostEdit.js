export const PostEdit = (postObj) => {
	return `
	<div class="newPost post border-radius">
	<h3>Edit This Post</h3>
		<header>
			<input value="${postObj.title}"
				   name="postTitle"
				   class="newPost__input"
				   type="text"
				   placeholder="Title" />
		</header>
		<div>
			<input value="${postObj.imageURL}"
				   name="postURL"
				   class="newPost__input"
				   type="text"
				   placeholder="URL of gif" />
		</div>

 
        <section class="post-description__block">
           	<textarea name="postDescription" class="newPost__input newPost__description" placeholder="Story behind your gif...">${postObj.description}</textarea>
        </section>
    <section class="author-dated-posted__block">
		
		<input type="hidden" value="${postObj.id}" name="postId">
		<input type="hidden" value="${postObj.dateCreated}" name="postTime">	
		<button id="updatePost__${postObj.id}">Update</button>
		<button id="newPost__cancel">Cancel</button>
	</div>
	`
}
