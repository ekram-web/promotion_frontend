import React, { useEffect, useState } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./Youtube.module.css";
import { fetchYoutubeVideos } from '../../../api/youtube';

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function YoutubeVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchYoutubeVideos()
      .then((res) => {
        setVideos(res.data.slice(0, 6)); // Limit to 6 videos
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const limitedVideos = videos.slice(0, 6);
  const videoRows = chunkArray(limitedVideos, 3);

  return (
    <section className={styles.youtubeSection} id="youtube">
      <div className={styles.youtubeContainer}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.youtubeHeader}
        >
          <div className={styles.badge}>LATEST MEDIA</div>
          <h2 className={styles.youtubeTitle}>Featured Video Lectures & Lessons</h2>
          <p className={styles.youtubeSubtitle}>
            Watch our latest Qur'anic reflections, tajweed guides, and institute announcements.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading latest media...</p>
          </div>
        )}

        {/* Video Grid in Rows */}
        {!loading && videos.length > 0 && (
          <div className={styles.rowsWrapper}>
            {videoRows.map((row, rowIndex) => {
              const isSelectedInRow =
                selectedVideo &&
                row.some((v) => v.id === selectedVideo.id);
              return (
                <React.Fragment key={rowIndex}>
                  <div className={styles.videoGrid}>
                    {row.map((video) => (
                      <div
                        key={video.id}
                        className={`${styles.videoCard} ${
                          selectedVideo && selectedVideo.id === video.id
                            ? styles.selected
                            : ""
                        }`}
                        onClick={() => setSelectedVideo(video)}
                      >
                        <div className={styles.videoThumbnail}>
                          <img src={video.thumbnail} alt={video.title} />
                          <div className={styles.playButton}>
                            <FaPlay className={styles.playIcon} />
                          </div>
                        </div>
                        <div className={styles.videoInfo}>
                          <h3 className={styles.videoTitle}>{video.title}</h3>
                          <p className={styles.videoDescription}>
                            {video.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Inline Expanded Player */}
                  {isSelectedInRow && selectedVideo && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={styles.videoPlayerRowWrapper}
                    >
                      <button
                        className={styles.closeButton}
                        onClick={handleCloseVideo}
                        aria-label="Close video"
                      >
                        <FaTimes /> Close Video
                      </button>
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                        title={selectedVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={styles.embedFrame}
                      ></iframe>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && videos.length === 0 && (
          <div className={styles.loadingContainer}>
            <p>No video lectures available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default YoutubeVideos;;


