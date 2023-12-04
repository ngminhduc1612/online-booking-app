import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';

// Import icon images
const heartIcon = require('../assets/icons/icon_heart.png');
const commentIcon = require('../assets/icons/icon_comment.png');
const imageUrls = [
  require('../assets/images/onboading2.png'),
  require('../assets/images/onboarding3.png'),
];

const ExplorePlaces = () => {
  const [showControls, setShowControls] = useState(true);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [currentImage, setCurrentImage] = useState(1); // Current image index
  const [isLiked, setIsLiked] = useState(false); // Track like status
  const [showCommentModal, setShowCommentModal] = useState(false); // Track comment modal visibility
  const [commentText, setCommentText] = useState(''); // Track comment text
  const [commentList, setCommentList] = useState([]); // List of comments
  const [modalHeight, setModalHeight] = useState(
    Dimensions.get('window').height * 0.5,
  );

  const toggleControls = () => {
    setShowControls(prevShowControls => !prevShowControls);
  };

  const likeVideo = () => {
    if (isLiked) {
      setLikes(prevLikes => prevLikes - 1);
    } else {
      setLikes(prevLikes => prevLikes + 1);
    }
    setIsLiked(prevIsLiked => !prevIsLiked);
  };

  const openCommentModal = () => {
    setModalHeight(Dimensions.get('window').height * 0.5); // Set modal height to 50% of window height
    setShowCommentModal(true);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
  };

  const submitComment = () => {
    if (commentText) {
      const newComment = {id: Date.now(), text: commentText};
      setCommentList(prevCommentList => [...prevCommentList, newComment]);
      setCommentText('');
    }
  };

  const changeImage = () => {
    setCurrentImage(prevImage => (prevImage === 0 ? 1 : 0)); // Toggle between image 0 and 1
  };

  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={toggleControls}>
        <Image source={imageUrls[currentImage]} style={styles.image} />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={closeCommentModal}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        {showControls && (
          <View
            style={[
              styles.controls,
              {transform: [{translateY: showControls ? 0 : 9999}]},
            ]}>
            <View style={styles.controlContainer}>
              <TouchableOpacity onPress={likeVideo}>
                <Image
                  source={heartIcon}
                  style={[styles.icon, {tintColor: isLiked ? 'red' : 'black'}]}
                />
                <Text style={styles.controlText}>{likes}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.controlContainer}>
              <TouchableOpacity onPress={openCommentModal}>
                <Image source={commentIcon} style={styles.icon} />
                <Text style={styles.controlText}>{comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.changeImageButton} onPress={changeImage}>
        <Text style={styles.changeImageButtonText}>Change Image</Text>
      </TouchableOpacity>

      <Modal
        visible={showCommentModal}
        animationType="slide"
        onRequestClose={closeCommentModal}>
        <View style={styles.commentModalOverlay} />
        <View style={[styles.commentModalContainer, {height: modalHeight}]}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeCommentModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={styles.commentListContainer}
            keyboardShouldPersistTaps="handled">
            {commentList.map(comment => (
              <View key={comment.id} style={styles.commentItem}>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Enter your comment"
              value={commentText}
              onChangeText={text => setCommentText(text)}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitComment}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.commentModalOverlay}
          onPress={closeCommentModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  controls: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: [{translateY: 0}],
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  controlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 8,
  },
  controlText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  changeImageButton: {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    padding: 16,
  },
  changeImageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'transparent',
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  commentListContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentItem: {
    paddingVertical: 4,
  },
  commentText: {
    fontSize: 16,
  },
  commentInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  submitButton: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentModalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ExplorePlaces;
